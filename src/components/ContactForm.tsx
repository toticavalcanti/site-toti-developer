'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  qualificationSubmittedSchema, 
  QualificationSubmitted 
} from '@/lib/qualification-schema';
import { 
  projectTypeLabels, 
  timelineLabels, 
  budgetBrlLabels, 
  budgetUsdLabels 
} from '@/lib/qualification-labels';
import TextInput from './TextInput';
import TextArea from './TextArea';
import Select from './Select';
import Button from './Button';
import { Send, AlertCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { aboutInfo } from '@/mockData';
import { useTranslations, useLocale } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tq = useTranslations('qualification');
  const tc = useTranslations('ctas');
  const locale = useLocale() as 'pt' | 'en';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const budgetLabels = locale === 'pt' ? budgetBrlLabels : budgetUsdLabels;

  const projectOptions = [
    { value: '', label: tq('project_not_sure') },
    ...Object.entries(projectTypeLabels).map(([val, key]) => ({
      value: val,
      label: tq(key)
    }))
  ];

  const budgetOptions = [
    { value: '', label: tq('budget_undefined') },
    ...Object.entries(budgetLabels).map(([val, key]) => ({
      value: val,
      label: tq(key)
    }))
  ];

  const timelineOptions = [
    { value: '', label: tq('timeline_no_rush') },
    ...Object.entries(timelineLabels).map(([val, key]) => ({
      value: val,
      label: tq(key)
    }))
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<QualificationSubmitted>({
    resolver: zodResolver(qualificationSubmittedSchema),
    defaultValues: {
      locale: locale,
      source: 'contact_page',
      stage: 'submitted'
    }
  });

  const onSubmit = async (data: QualificationSubmitted) => {
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
          label={`${tq('field_name')} *`}
          placeholder="João Silva"
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

      <TextInput
        label={`${tq('field_email')} *`}
        placeholder="joao@exemplo.com"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <Select
              label={`${tq('field_project_type')} *`}
              options={projectOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.projectType?.message}
            />
          )}
        />

        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select
              label={`${tq('field_budget')} *`}
              options={budgetOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.budget?.message}
            />
          )}
        />
      </div>

      <Controller
        name="timeline"
        control={control}
        render={({ field }) => (
          <Select
            label={`${tq('field_timeline')} *`}
            options={timelineOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.timeline?.message}
          />
        )}
      />

      <TextArea
        label={tq('field_message')}
        placeholder="..."
        rows={4}
        {...register('message')}
        error={errors.message?.message}
      />

      {submitSuccess && (
        <div className="p-4 rounded-xl bg-success/10 border border-success text-success text-sm font-bold flex items-center gap-2">
          <span>{tq('submit_success')}</span>
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
            {tq('submit_email')} <Send size={20} />
          </div>
        )}
      </Button>

      <div className="text-center pt-6 border-t border-border/50 mt-6 space-y-4">
          <p className="text-[10px] text-foreground-muted uppercase tracking-[0.2em] font-black">
            {t('or')}
          </p>
          <Link
            href={`https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}` as any}
            target="_blank"
            className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-black text-sm uppercase tracking-wider"
          >
            <MessageCircle size={20} />
            {tc('prefer_whatsapp')}
          </Link>
          <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-bold">
            {tq('availability')}
          </p>
      </div>
    </form>
  );
}
