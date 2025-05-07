
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

interface RegistrationFormProps {
  language: 'en' | 'fr';
  onSubmitSuccess: () => void;
}

const countryCodes = [
  { code: '+243', country: 'Congo (DRC)' },
  { code: '+1', country: 'USA' },
  { code: '+33', country: 'France' },
  { code: '+27', country: 'South Africa' },
  { code: '+254', country: 'Kenya' },
  { code: '+250', country: 'Rwanda' },
  { code: '+256', country: 'Uganda' },
  { code: '+44', country: 'United Kingdom' }
];

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
    placeholders: {
      fullName: "Enter your full name",
      email: "Enter your email address",
      phoneNumber: "Enter your phone number",
      city: "Enter your city",
      company: "Enter your company name (if applicable)",
      description: "Enter details about your inquiry"
    },
    validation: {
      nameRequired: "Full name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
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
    countryCode: "Code du Pays",
    city: "Ville",
    company: "Nom de l'Entreprise (Optionnel)",
    description: "Description Courte de la Demande (Optionnel)",
    submit: "Soumettre la Demande",
    placeholders: {
      fullName: "Entrez votre nom complet",
      email: "Entrez votre adresse email",
      phoneNumber: "Entrez votre numéro de téléphone",
      city: "Entrez votre ville",
      company: "Entrez le nom de votre entreprise (si applicable)",
      description: "Entrez les détails de votre demande"
    },
    validation: {
      nameRequired: "Le nom complet est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Veuillez entrer un email valide",
      phoneRequired: "Le numéro de téléphone est requis",
      countryCodeRequired: "Le code du pays est requis",
      cityRequired: "La ville est requise"
    }
  }
};

// Create a schema for form validation
const createInquirySchema = (text: any) => z.object({
  fullName: z.string().min(1, { message: text.validation.nameRequired }),
  email: z.string().min(1, { message: text.validation.emailRequired }).email({ message: text.validation.emailInvalid }),
  countryCode: z.string().min(1, { message: text.validation.countryCodeRequired }),
  phoneNumber: z.string().min(1, { message: text.validation.phoneRequired }),
  city: z.string().min(1, { message: text.validation.cityRequired }),
  company: z.string().optional(),
  description: z.string().optional(),
});

const RegistrationForm = ({
  language,
  onSubmitSuccess
}: RegistrationFormProps) => {
  const text = translations[language];
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquirySchema = createInquirySchema(text);
  type InquiryFormValues = z.infer<typeof inquirySchema>;

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+243", // Default to Congo (DRC)
      phoneNumber: "",
      city: "",
      company: "",
      description: "",
    }
  });

  const handleSubmit = async (values: InquiryFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real implementation, we would send this data to an API endpoint
      // that would use Supabase Edge Functions to email the data
      console.log("Form data to be sent:", values);
      console.log("Would be sent to email: ramisaleh@bestbuy-congo.com");

      // Simulate form submission delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: language === 'en' ? "Inquiry Submitted" : "Demande Soumise",
        description: language === 'en' 
          ? "Thank you for your interest. A representative will contact you soon." 
          : "Merci pour votre intérêt. Un représentant vous contactera bientôt."
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: language === 'en' ? "Submission Failed" : "Échec de la Soumission",
        description: language === 'en' 
          ? "There was an error submitting your inquiry. Please try again." 
          : "Une erreur s'est produite lors de la soumission de votre demande. Veuillez réessayer.",
        variant: "destructive"
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
                    <FormLabel className="text-[#023356]">{text.fullName}*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          className="pl-10 text-white" 
                          placeholder={text.placeholders.fullName}
                          {...field} 
                          style={{ color: "white" }}
                        />
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
                    <FormLabel className="text-[#023356]">{text.email}*</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input 
                          className="pl-10 text-white" 
                          placeholder={text.placeholders.email}
                          type="email"
                          {...field} 
                          style={{ color: "white" }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel className="text-[#023356]">{text.countryCode}*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-white">
                            <SelectValue placeholder="Country Code" className="text-white" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.code} - {country.country}
                            </SelectItem>
                          ))}
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
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-[#023356]">{text.phoneNumber}*</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                          <Input 
                            className="pl-10 text-white" 
                            placeholder={text.placeholders.phoneNumber}
                            type="tel"
                            {...field} 
                            style={{ color: "white" }}
                          />
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
                    <FormLabel className="text-[#023356]">{text.city}*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={text.placeholders.city}
                        className="text-white"
                        {...field} 
                        style={{ color: "white" }}
                      />
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
                    <FormLabel className="text-[#023356]">{text.company}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={text.placeholders.company}
                        className="text-white"
                        {...field} 
                        style={{ color: "white" }}
                      />
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
                    <FormLabel className="text-[#023356]">{text.description}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={text.placeholders.description}
                        className="resize-none text-white"
                        rows={4}
                        {...field} 
                        style={{ color: "white" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'en' ? "Processing..." : "Traitement..."}
                    </span>
                  ) : text.submit}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
