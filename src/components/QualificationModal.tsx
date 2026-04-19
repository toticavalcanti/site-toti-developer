'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useQualification } from '@/lib/qualification-context';
import { 
  projectTypeLabels, 
  timelineLabels, 
  budgetBrlLabels, 
  budgetUsdLabels 
} from '@/lib/qualification-labels';
import { buildWhatsappUrl } from '@/lib/whatsapp';
import { aboutInfo } from '@/mockData';
import TextInput from './TextInput';
import Select from './Select';
import TextArea from './TextArea';
import { cn } from '@/utils';
import AnimatedButton from './ui/AnimatedButton';

export default function QualificationModal() {
  const t = useTranslations('qualification');
  const tc = useTranslations('ctas');
  const locale = useLocale() as 'pt' | 'en';
  const { isOpen, defaultProjectType, source, close } = useQualification();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset form when modal opens with new defaults
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        projectType: defaultProjectType || '',
      }));
      setStep(1);
      setIsSuccess(false);
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, defaultProjectType]);

  // Trap focus and handle Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isQualificationComplete = formData.projectType && formData.budget && formData.timeline;
  const isFormComplete = isQualificationComplete && formData.name && /^\S+@\S+\.\S+$/.test(formData.email);

  const handlePartialSave = async (stage: 'whatsapp_handoff' | 'modal_abandoned') => {
    const payload = {
      ...formData,
      locale,
      source: source || 'unknown',
      stage,
      whatsapp: '' // optional
    };

    try {
      if (typeof navigator.sendBeacon === 'function' && stage === 'modal_abandoned') {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon('/api/leads/qualification', blob);
      } else {
        await fetch('/api/leads/qualification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (err) {
      console.warn('[Qualification] Failed to save partial lead:', err);
    }
  };

  const handleSubmitEmail = async () => {
    if (!isFormComplete) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        locale,
        source: source || 'unknown',
        stage: 'submitted'
      };

      const res = await fetch('/api/leads/qualification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit');
      
      setIsSuccess(true);
    } catch (err) {
      setError(t('submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = async () => {
    if (!isQualificationComplete) return;
    
    await handlePartialSave('whatsapp_handoff');
    
    const url = buildWhatsappUrl(aboutInfo.whatsapp, locale, {
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      name: formData.name,
      message: formData.message
    });
    
    window.open(url, '_blank');
    close();
  };

  const handleClose = () => {
    if (!isSuccess && (formData.projectType || formData.budget || formData.timeline)) {
      handlePartialSave('modal_abandoned');
    }
    close();
  };

  const projectOptions = [
    { value: '', label: t('project_not_sure') },
    ...Object.entries(projectTypeLabels).map(([val, key]) => ({
      value: val,
      label: t(key)
    }))
  ];

  const budgetOptionsMap = locale === 'pt' ? budgetBrlLabels : budgetUsdLabels;
  const budgetOptions = [
    { value: '', label: t('budget_undefined') },
    ...Object.entries(budgetOptionsMap).map(([val, key]) => ({
      value: val,
      label: t(key)
    }))
  ];

  const timelineOptions = [
    { value: '', label: t('timeline_no_rush') },
    ...Object.entries(timelineLabels).map(([val, key]) => ({
      value: val,
      label: t(key)
    }))
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={handleClose}
        />

        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "relative w-full h-full sm:h-auto sm:max-w-2xl bg-background border border-border shadow-2xl overflow-hidden flex flex-col",
            "sm:rounded-[2.5rem]"
          )}
        >
          {/* Header */}
          <div className="p-6 sm:p-8 flex items-center justify-between border-b border-border/50">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {isSuccess ? t('submit_success') : t('modal_title')}
              </h2>
              {!isSuccess && (
                <p className="text-sm text-foreground-secondary mt-1">
                  {t('modal_subtitle')}
                </p>
              )}
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-background-secondary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('submit_success')}</h3>
                <p className="text-foreground-secondary mb-8">
                  {t('availability')}
                </p>
                <AnimatedButton onClick={handleClose} variant="primary">
                  Fechar
                </AnimatedButton>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Select
                    label={t('field_project_type')}
                    options={projectOptions}
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                  />
                  <Select
                    label={t('field_budget')}
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                  />
                </div>
                
                <Select
                  label={t('field_timeline')}
                  options={timelineOptions}
                  value={formData.timeline}
                  onChange={(e) => handleChange('timeline', e.target.value)}
                />

                <div className="h-[1px] bg-border/50 my-2" />

                <div className="grid sm:grid-cols-2 gap-6">
                  <TextInput
                    label={t('field_name')}
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  <TextInput
                    label={t('field_email')}
                    placeholder="joao@exemplo.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                <TextArea
                  label={t('field_message')}
                  placeholder="..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />

                {error && (
                  <div className="text-error text-sm flex items-center gap-2 font-medium">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-6 sm:p-8 bg-background-secondary/50 border-t border-border/50 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton 
                  onClick={handleSubmitEmail}
                  disabled={isSubmitting || !isFormComplete}
                  className="flex-1"
                  variant="primary"
                >
                  {isSubmitting ? '...' : <><Send size={18} /> {t('submit_email')}</>}
                </AnimatedButton>
                
                <AnimatedButton
                  onClick={handleWhatsAppClick}
                  disabled={!isQualificationComplete}
                  variant="outline"
                  className="flex-1 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/5"
                >
                  <MessageCircle size={18} /> {t('submit_whatsapp')}
                </AnimatedButton>
              </div>
              
              <p className="text-[10px] text-center text-foreground-muted uppercase tracking-wider font-semibold">
                {t('availability')}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
