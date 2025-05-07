import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Phone } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

const supabase = createClient(
  'https://mjkhixneqwltxbeoeagk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qa2hpeG5lcXdsdHhiZW9lYWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MjM0MjgsImV4cCI6MjA2MjE5OTQyOH0.Bj_NdJFls4LesfIwvNXzHqrTpiz49ourUoDbDGfR7qs'
);

interface RegistrationFormProps {
  language: 'en' | 'fr';
  onSubmitSuccess: () => void;
}

// ... countryCodes, translations, and createInquirySchema remain unchanged ...

// Imports here
import { useToast } from '@/hooks/use-toast';
// ...other imports...

// ✅ Add this before the component starts
const translations = {
  en: {
    heading: "Register Your Interest",
    // ...
  },
  fr: {
    heading: "Enregistrez Votre Intérêt",
    // ...
  }
};

// Optional: also include createInquirySchema() here if it's missing


const RegistrationForm = ({ language, onSubmitSuccess }: RegistrationFormProps) => {
  const text = translations[language];
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquirySchema = createInquirySchema(text);
  type InquiryFormValues = z.infer<typeof inquirySchema>;

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+243',
      phoneNumber: '',
      city: '',
      company: '',
      description: '',
    }
  });

  const handleSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);

    try {
      // 1. Save to Supabase
      const { error } = await supabase.from('registrations').insert([values]);
      if (error) throw new Error('Supabase error: ' + error.message);

      // 2. Send via EmailJS
      await emailjs.send(
        'service_e07eica',
        'template_shs3x5l',
        values,
        'aJ-DM-3Au2QMUaHKW'
      );

      toast({
        title: language === 'en' ? 'Inquiry Submitted' : 'Demande Soumise',
        description: language === 'en'
          ? 'Thank you for your interest. A representative will contact you soon.'
          : 'Merci pour votre intérêt. Un représentant vous contactera bientôt.'
      });

      onSubmitSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: language === 'en' ? 'Submission Failed' : 'Échec de la Soumission',
        description: language === 'en'
          ? 'There was an error submitting your inquiry. Please try again.'
          : "Une erreur s'est produite lors de la soumission de votre demande. Veuillez réessayer.",
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-starlink-light-gray" id="register">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-starlink-dark-blue">
            {text.heading}
          </h2>
          <p className="text-center mb-8 text-starlink-slate">
            {text.subheading}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* ... form fields unchanged ... */}
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

