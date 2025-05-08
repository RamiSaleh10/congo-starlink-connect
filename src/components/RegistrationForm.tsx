
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
import { supabase } from '@/integrations/supabase/client';
import emailjs from '@emailjs/browser';
import { createInquirySchema } from '@/lib/validation';

interface RegistrationFormProps {
  language: 'en' | 'fr';
  onSubmitSuccess: () => void;
}

// Define translations for the form
const translations = {
  en: {
    heading: "Register Your Interest",
    subheading: "Complete the form below to express your interest in Starlink services",
    fullName: "Full Name",
    email: "Email Address",
    phoneNumber: "Phone Number",
    countryCode: "Country Code",
    city: "City",
    company: "Company Name (Optional)",
    description: "Short Description of Inquiry (Optional)",
    submit: "Submit Inquiry",
    validation: {
      nameRequired: "Full name is required",
      emailRequired: "Email address is required",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "Phone number is required",
      countryCodeRequired: "Country code is required",
      cityRequired: "City is required"
    }
  },
  fr: {
    heading: "Enregistrez Votre Intérêt",
    subheading: "Remplissez le formulaire ci-dessous pour exprimer votre intérêt pour les services Starlink",
    fullName: "Nom Complet",
    email: "Adresse Email",
    phoneNumber: "Numéro de Téléphone",
    countryCode: "Code Pays",
    city: "Ville",
    company: "Nom de l'Entreprise (Optionnel)",
    description: "Brève Description de Votre Demande (Optionnel)",
    submit: "Soumettre la Demande",
    validation: {
      nameRequired: "Le nom complet est requis",
      emailRequired: "L'adresse e-mail est requise",
      emailInvalid: "Veuillez entrer une adresse e-mail valide",
      phoneRequired: "Le numéro de téléphone est requis",
      countryCodeRequired: "Le code pays est requis",
      cityRequired: "La ville est requise"
    }
  }
};

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
      const { error } = await supabase.from('registrations').insert([{
        full_name: values.fullName,
        email: values.email,
        country_code: values.countryCode,
        phone_number: values.phoneNumber,
        city: values.city,
        company_name: values.company,
        inquiry: values.description
      }]);
      
      if (error) throw new Error('Supabase error: ' + error.message);

      // 2. Send via EmailJS
      await emailjs.send(
        'service_e07eica',
        'template_shs3x5l',
        {
          full_name: values.fullName,
          email: values.email,
          country_code: values.countryCode,
          phone_number: values.phoneNumber,
          city: values.city,
          company_name: values.company || 'N/A',
          inquiry: values.description || 'N/A'
        },
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
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.fullName}*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input className="pl-10" placeholder={text.fullName} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.email}*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input className="pl-10" type="email" placeholder={text.email} {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.countryCode}*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="+243" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="+243">+243 (DRC)</SelectItem>
                          <SelectItem value="+250">+250 (Rwanda)</SelectItem>
                          <SelectItem value="+256">+256 (Uganda)</SelectItem>
                          <SelectItem value="+257">+257 (Burundi)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{text.phoneNumber}*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input className="pl-10" placeholder={text.phoneNumber} {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.city}*</FormLabel>
                    <FormControl>
                      <Input placeholder={text.city} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.company}</FormLabel>
                    <FormControl>
                      <Input placeholder={text.company} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{text.description}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={text.description} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <span className="inline-block animate-spin mr-2">⟳</span>
                ) : null}
                {text.submit}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
