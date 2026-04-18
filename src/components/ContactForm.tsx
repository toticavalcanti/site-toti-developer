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
import Link from 'next/link';
import { aboutInfo } from '@/mockData';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp inválido (mínimo 10 dígitos)'),
  pilar: z.string().min(1, 'Selecione o tipo de projeto'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(500, 'Mensagem muito longa (máximo 500 caracteres)'),
  pocketShowWaitlist: z.boolean().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ApiResponse {
  success: boolean;
  message: string;
  whatsappHref?: string;
  errors?: Record<string, string[]>;
}

const pilarOptions = [
  { value: '', label: 'Selecione...' },
  { value: 'ia-automacao', label: 'IA & Automação' },
  { value: 'sites-sistemas', label: 'Sites & Sistemas' },
  { value: 'audiovisual-musica', label: 'Audiovisual & Música' },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappFallback, setWhatsappFallback] = useState<string | null>(null);

  const defaultWhatsappUrl = `https://wa.me/${aboutInfo.whatsapp.replace(/\D/g, '')}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const selectedPilar = watch('pilar');
  const showPocketShowCheckbox = selectedPilar === 'audiovisual-musica';

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setWhatsappFallback(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (!result.success) {
        setSubmitError(result.message || 'Erro ao enviar mensagem. Tente novamente.');
        // Set WhatsApp fallback if provided by API
        if (result.whatsappHref) {
          setWhatsappFallback(result.whatsappHref);
        }
        return;
      }

      // Success!
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 10000);

    } catch {
      // Network or parsing error - always show feedback
      setSubmitError('Erro de conexão. Por favor, tente novamente ou fale pelo WhatsApp:');
      setWhatsappFallback(defaultWhatsappUrl);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <TextInput
        label="Nome *"
        placeholder="Seu nome completo"
        {...register('name')}
        error={errors.name?.message}
      />

      <TextInput
        label="WhatsApp *"
        placeholder="(21) 99999-9999"
        {...register('whatsapp')}
        error={errors.whatsapp?.message}
      />

      <Select
        label="Área de Interesse *"
        options={pilarOptions}
        {...register('pilar')}
        error={errors.pilar?.message}
      />

      {/* Pocket Show Waitlist Checkbox - Only for Audiovisual */}
      {showPocketShowCheckbox && (
        <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('pocketShowWaitlist')}
              className="mt-1 h-4 w-4 rounded border-warning text-warning focus:ring-warning"
            />
            <div className="flex-1">
              <span className="font-medium text-foreground">
                Quero entrar na lista do Pocket Show
              </span>
              <p className="text-sm text-foreground-secondary mt-1">
                O Pocket Show está em montagem. Marque para ter prioridade quando disponível.
              </p>
            </div>
          </label>
        </div>
      )}

      <TextArea
        label="Mensagem *"
        placeholder="Descreva brevemente seu projeto ou necessidade..."
        rows={4}
        {...register('message')}
        error={errors.message?.message}
      />

      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 rounded-lg bg-success/10 border border-success text-success">
          ✓ Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {/* Error Message with WhatsApp Fallback */}
      {submitError && (
        <div className="p-4 rounded-lg bg-error/10 border border-error text-error">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="mb-3">{submitError}</p>
              {whatsappFallback && (
                <Link
                  href={whatsappFallback}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white font-medium hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle size={18} />
                  Abrir WhatsApp
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            Enviar Mensagem <Send size={20} className="ml-2" />
          </>
        )}
      </Button>
    </form>
  );
}
