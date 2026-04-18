'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Select from './Select';
import Button from './Button';
import { Send, AlertCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations } from 'next-intl';

const contactSchema = z.object({
  name: z.string().min(2, 'Min 2 chars'),
  whatsapp: z.string().min(10, 'Min 10 digits'),
  pilar: z.string().min(1, 'Required'),
  message: z.string().min(10, 'Min 10 chars').max(500, 'Max 500 chars'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const ts = useTranslations('services');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const pilarOptions = [
    { value: '', label: t('select') },
    { value: 'landing-pages', label: ts('lp_title') },
    { value: 'ecommerce', label: ts('store_title') },
    { value: 'automation', label: ts('automation_title') },
    { value: 'custom', label: ts('custom_title') },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error('API Error');
      }
    } catch {
      setSubmitError(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <TextInput
          label={`${t('name')} *`}
          placeholder={t('name')}
          {...register('name')}
          error={errors.name?.message}
        />

        <TextInput
          label={`${t('whatsapp')} *`}
          placeholder="(21) 98871-4006"
          {...register('whatsapp')}
          error={errors.whatsapp?.message}
        />
      </div>

      <Select
        label={`${t('project_type')} *`}
        options={pilarOptions}
        {...register('pilar')}
        error={errors.pilar?.message}
      />

      <TextArea
        label={`${t('message')} *`}
        placeholder={t('how_can_help')}
        rows={4}
        {...register('message')}
        error={errors.message?.message}
      />

      {submitSuccess && (
        <div className="p-4 rounded-xl bg-success/10 border border-success text-success text-sm font-bold flex items-center gap-2">
          <span>{t('success')}</span>
        </div>
      )}

      {submitError && (
        <div className="p-4 rounded-xl bg-error/10 border border-error text-error text-sm flex items-center gap-2 font-bold">
          <AlertCircle size={18} /> {submitError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-lg shadow-xl shadow-primary/20">
        {isSubmitting ? t('sending') : (
          <div className="flex items-center gap-2">
            {t('send')} <Send size={20} />
          </div>
        )}
      </Button>

      <div className="text-center pt-6 border-t border-border/50 mt-6">
         <p className="text-[10px] text-foreground-muted mb-4 uppercase tracking-[0.2em] font-black">
            {t('or')}
         </p>
         <Link
            href={`https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}` as any}
            target="_blank"
            className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-black text-sm uppercase tracking-wider"
          >
            <MessageCircle size={20} />
            {t('chat_wa')}
          </Link>
      </div>
    </form>
  );
}
