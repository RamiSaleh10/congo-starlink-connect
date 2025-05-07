
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

// Comprehensive list of country codes
const countryCodes = [
  { code: '+93', country: 'Afghanistan' },
  { code: '+355', country: 'Albania' },
  { code: '+213', country: 'Algeria' },
  { code: '+1', country: 'American Samoa' },
  { code: '+376', country: 'Andorra' },
  { code: '+244', country: 'Angola' },
  { code: '+1', country: 'Anguilla' },
  { code: '+1', country: 'Antigua and Barbuda' },
  { code: '+54', country: 'Argentina' },
  { code: '+374', country: 'Armenia' },
  { code: '+297', country: 'Aruba' },
  { code: '+61', country: 'Australia' },
  { code: '+43', country: 'Austria' },
  { code: '+994', country: 'Azerbaijan' },
  { code: '+1', country: 'Bahamas' },
  { code: '+973', country: 'Bahrain' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+1', country: 'Barbados' },
  { code: '+375', country: 'Belarus' },
  { code: '+32', country: 'Belgium' },
  { code: '+501', country: 'Belize' },
  { code: '+229', country: 'Benin' },
  { code: '+1', country: 'Bermuda' },
  { code: '+975', country: 'Bhutan' },
  { code: '+591', country: 'Bolivia' },
  { code: '+387', country: 'Bosnia and Herzegovina' },
  { code: '+267', country: 'Botswana' },
  { code: '+55', country: 'Brazil' },
  { code: '+246', country: 'British Indian Ocean Territory' },
  { code: '+1', country: 'British Virgin Islands' },
  { code: '+673', country: 'Brunei' },
  { code: '+359', country: 'Bulgaria' },
  { code: '+226', country: 'Burkina Faso' },
  { code: '+257', country: 'Burundi' },
  { code: '+855', country: 'Cambodia' },
  { code: '+237', country: 'Cameroon' },
  { code: '+1', country: 'Canada' },
  { code: '+238', country: 'Cape Verde' },
  { code: '+1', country: 'Cayman Islands' },
  { code: '+236', country: 'Central African Republic' },
  { code: '+235', country: 'Chad' },
  { code: '+56', country: 'Chile' },
  { code: '+86', country: 'China' },
  { code: '+61', country: 'Christmas Island' },
  { code: '+61', country: 'Cocos Islands' },
  { code: '+57', country: 'Colombia' },
  { code: '+269', country: 'Comoros' },
  { code: '+682', country: 'Cook Islands' },
  { code: '+506', country: 'Costa Rica' },
  { code: '+385', country: 'Croatia' },
  { code: '+53', country: 'Cuba' },
  { code: '+599', country: 'Curaçao' },
  { code: '+357', country: 'Cyprus' },
  { code: '+420', country: 'Czech Republic' },
  { code: '+243', country: 'Democratic Republic of the Congo' },
  { code: '+45', country: 'Denmark' },
  { code: '+253', country: 'Djibouti' },
  { code: '+1', country: 'Dominica' },
  { code: '+1', country: 'Dominican Republic' },
  { code: '+670', country: 'East Timor' },
  { code: '+593', country: 'Ecuador' },
  { code: '+20', country: 'Egypt' },
  { code: '+503', country: 'El Salvador' },
  { code: '+240', country: 'Equatorial Guinea' },
  { code: '+291', country: 'Eritrea' },
  { code: '+372', country: 'Estonia' },
  { code: '+251', country: 'Ethiopia' },
  { code: '+500', country: 'Falkland Islands' },
  { code: '+298', country: 'Faroe Islands' },
  { code: '+679', country: 'Fiji' },
  { code: '+358', country: 'Finland' },
  { code: '+33', country: 'France' },
  { code: '+594', country: 'French Guiana' },
  { code: '+689', country: 'French Polynesia' },
  { code: '+241', country: 'Gabon' },
  { code: '+220', country: 'Gambia' },
  { code: '+995', country: 'Georgia' },
  { code: '+49', country: 'Germany' },
  { code: '+233', country: 'Ghana' },
  { code: '+350', country: 'Gibraltar' },
  { code: '+30', country: 'Greece' },
  { code: '+299', country: 'Greenland' },
  { code: '+1', country: 'Grenada' },
  { code: '+590', country: 'Guadeloupe' },
  { code: '+1', country: 'Guam' },
  { code: '+502', country: 'Guatemala' },
  { code: '+44', country: 'Guernsey' },
  { code: '+224', country: 'Guinea' },
  { code: '+245', country: 'Guinea-Bissau' },
  { code: '+592', country: 'Guyana' },
  { code: '+509', country: 'Haiti' },
  { code: '+504', country: 'Honduras' },
  { code: '+852', country: 'Hong Kong' },
  { code: '+36', country: 'Hungary' },
  { code: '+354', country: 'Iceland' },
  { code: '+91', country: 'India' },
  { code: '+62', country: 'Indonesia' },
  { code: '+98', country: 'Iran' },
  { code: '+964', country: 'Iraq' },
  { code: '+353', country: 'Ireland' },
  { code: '+44', country: 'Isle of Man' },
  { code: '+972', country: 'Israel' },
  { code: '+39', country: 'Italy' },
  { code: '+225', country: 'Ivory Coast' },
  { code: '+1', country: 'Jamaica' },
  { code: '+81', country: 'Japan' },
  { code: '+44', country: 'Jersey' },
  { code: '+962', country: 'Jordan' },
  { code: '+7', country: 'Kazakhstan' },
  { code: '+254', country: 'Kenya' },
  { code: '+686', country: 'Kiribati' },
  { code: '+383', country: 'Kosovo' },
  { code: '+965', country: 'Kuwait' },
  { code: '+996', country: 'Kyrgyzstan' },
  { code: '+856', country: 'Laos' },
  { code: '+371', country: 'Latvia' },
  { code: '+961', country: 'Lebanon' },
  { code: '+266', country: 'Lesotho' },
  { code: '+231', country: 'Liberia' },
  { code: '+218', country: 'Libya' },
  { code: '+423', country: 'Liechtenstein' },
  { code: '+370', country: 'Lithuania' },
  { code: '+352', country: 'Luxembourg' },
  { code: '+853', country: 'Macau' },
  { code: '+389', country: 'Macedonia' },
  { code: '+261', country: 'Madagascar' },
  { code: '+265', country: 'Malawi' },
  { code: '+60', country: 'Malaysia' },
  { code: '+960', country: 'Maldives' },
  { code: '+223', country: 'Mali' },
  { code: '+356', country: 'Malta' },
  { code: '+692', country: 'Marshall Islands' },
  { code: '+596', country: 'Martinique' },
  { code: '+222', country: 'Mauritania' },
  { code: '+230', country: 'Mauritius' },
  { code: '+262', country: 'Mayotte' },
  { code: '+52', country: 'Mexico' },
  { code: '+691', country: 'Micronesia' },
  { code: '+373', country: 'Moldova' },
  { code: '+377', country: 'Monaco' },
  { code: '+976', country: 'Mongolia' },
  { code: '+382', country: 'Montenegro' },
  { code: '+1', country: 'Montserrat' },
  { code: '+212', country: 'Morocco' },
  { code: '+258', country: 'Mozambique' },
  { code: '+95', country: 'Myanmar' },
  { code: '+264', country: 'Namibia' },
  { code: '+674', country: 'Nauru' },
  { code: '+977', country: 'Nepal' },
  { code: '+31', country: 'Netherlands' },
  { code: '+687', country: 'New Caledonia' },
  { code: '+64', country: 'New Zealand' },
  { code: '+505', country: 'Nicaragua' },
  { code: '+227', country: 'Niger' },
  { code: '+234', country: 'Nigeria' },
  { code: '+683', country: 'Niue' },
  { code: '+672', country: 'Norfolk Island' },
  { code: '+850', country: 'North Korea' },
  { code: '+1', country: 'Northern Mariana Islands' },
  { code: '+47', country: 'Norway' },
  { code: '+968', country: 'Oman' },
  { code: '+92', country: 'Pakistan' },
  { code: '+680', country: 'Palau' },
  { code: '+970', country: 'Palestine' },
  { code: '+507', country: 'Panama' },
  { code: '+675', country: 'Papua New Guinea' },
  { code: '+595', country: 'Paraguay' },
  { code: '+51', country: 'Peru' },
  { code: '+63', country: 'Philippines' },
  { code: '+64', country: 'Pitcairn' },
  { code: '+48', country: 'Poland' },
  { code: '+351', country: 'Portugal' },
  { code: '+1', country: 'Puerto Rico' },
  { code: '+974', country: 'Qatar' },
  { code: '+242', country: 'Republic of the Congo' },
  { code: '+262', country: 'Reunion' },
  { code: '+40', country: 'Romania' },
  { code: '+7', country: 'Russia' },
  { code: '+250', country: 'Rwanda' },
  { code: '+590', country: 'Saint Barthélemy' },
  { code: '+290', country: 'Saint Helena' },
  { code: '+1', country: 'Saint Kitts and Nevis' },
  { code: '+1', country: 'Saint Lucia' },
  { code: '+590', country: 'Saint Martin' },
  { code: '+508', country: 'Saint Pierre and Miquelon' },
  { code: '+1', country: 'Saint Vincent and the Grenadines' },
  { code: '+685', country: 'Samoa' },
  { code: '+378', country: 'San Marino' },
  { code: '+239', country: 'São Tomé and Príncipe' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+221', country: 'Senegal' },
  { code: '+381', country: 'Serbia' },
  { code: '+248', country: 'Seychelles' },
  { code: '+232', country: 'Sierra Leone' },
  { code: '+65', country: 'Singapore' },
  { code: '+1', country: 'Sint Maarten' },
  { code: '+421', country: 'Slovakia' },
  { code: '+386', country: 'Slovenia' },
  { code: '+677', country: 'Solomon Islands' },
  { code: '+252', country: 'Somalia' },
  { code: '+27', country: 'South Africa' },
  { code: '+82', country: 'South Korea' },
  { code: '+211', country: 'South Sudan' },
  { code: '+34', country: 'Spain' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+249', country: 'Sudan' },
  { code: '+597', country: 'Suriname' },
  { code: '+47', country: 'Svalbard and Jan Mayen' },
  { code: '+268', country: 'Swaziland' },
  { code: '+46', country: 'Sweden' },
  { code: '+41', country: 'Switzerland' },
  { code: '+963', country: 'Syria' },
  { code: '+886', country: 'Taiwan' },
  { code: '+992', country: 'Tajikistan' },
  { code: '+255', country: 'Tanzania' },
  { code: '+66', country: 'Thailand' },
  { code: '+670', country: 'Timor-Leste' },
  { code: '+228', country: 'Togo' },
  { code: '+690', country: 'Tokelau' },
  { code: '+676', country: 'Tonga' },
  { code: '+1', country: 'Trinidad and Tobago' },
  { code: '+216', country: 'Tunisia' },
  { code: '+90', country: 'Turkey' },
  { code: '+993', country: 'Turkmenistan' },
  { code: '+1', country: 'Turks and Caicos Islands' },
  { code: '+688', country: 'Tuvalu' },
  { code: '+1', country: 'U.S. Virgin Islands' },
  { code: '+256', country: 'Uganda' },
  { code: '+380', country: 'Ukraine' },
  { code: '+971', country: 'United Arab Emirates' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+1', country: 'United States' },
  { code: '+598', country: 'Uruguay' },
  { code: '+998', country: 'Uzbekistan' },
  { code: '+678', country: 'Vanuatu' },
  { code: '+379', country: 'Vatican' },
  { code: '+58', country: 'Venezuela' },
  { code: '+84', country: 'Vietnam' },
  { code: '+681', country: 'Wallis and Futuna' },
  { code: '+212', country: 'Western Sahara' },
  { code: '+967', country: 'Yemen' },
  { code: '+260', country: 'Zambia' },
  { code: '+263', country: 'Zimbabwe' }
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
                            <SelectItem key={country.code + country.country} value={country.code}>
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
