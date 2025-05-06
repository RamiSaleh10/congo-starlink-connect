
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface RegistrationFormProps {
  language: 'en' | 'fr';
  onSubmitSuccess: () => void;
}

const translations = {
  en: {
    heading: "Register Your Interest",
    subheading: "Complete the form below to express your interest in Starlink services",
    fullName: "Full Name",
    email: "Email Address",
    nationality: "Nationality",
    address: "Address",
    company: "Company Name (Optional)",
    submit: "Register Interest",
    placeholders: {
      fullName: "Enter your full name",
      email: "Enter your email address",
      nationality: "Enter your nationality",
      address: "Enter your complete address",
      company: "Enter your company name (if applicable)"
    },
    validation: {
      nameRequired: "Full name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      nationalityRequired: "Nationality is required",
      addressRequired: "Address is required"
    }
  },
  fr: {
    heading: "Enregistrez Votre Intérêt",
    subheading: "Remplissez le formulaire ci-dessous pour exprimer votre intérêt pour les services Starlink",
    fullName: "Nom Complet",
    email: "Adresse Email",
    nationality: "Nationalité",
    address: "Adresse",
    company: "Nom de l'Entreprise (Optionnel)",
    submit: "Enregistrer l'intérêt",
    placeholders: {
      fullName: "Entrez votre nom complet",
      email: "Entrez votre adresse email",
      nationality: "Entrez votre nationalité",
      address: "Entrez votre adresse complète",
      company: "Entrez le nom de votre entreprise (si applicable)"
    },
    validation: {
      nameRequired: "Le nom complet est requis",
      emailRequired: "L'email est requis",
      emailInvalid: "Veuillez entrer un email valide",
      nationalityRequired: "La nationalité est requise",
      addressRequired: "L'adresse est requise"
    }
  }
};

const RegistrationForm = ({ language, onSubmitSuccess }: RegistrationFormProps) => {
  const text = translations[language];
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    nationality: "",
    address: "",
    company: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is being typed in
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = text.validation.nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = text.validation.emailRequired;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = text.validation.emailInvalid;
    }
    
    if (!formData.nationality.trim()) {
      newErrors.nationality = text.validation.nationalityRequired;
    }
    
    if (!formData.address.trim()) {
      newErrors.address = text.validation.addressRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmitSuccess();
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          nationality: "",
          address: "",
          company: ""
        });
        
        // Show toast notification
        toast({
          title: language === 'en' ? "Registration Successful" : "Inscription Réussie",
          description: language === 'en' 
            ? "Thank you for your interest in Starlink!" 
            : "Merci pour votre intérêt pour Starlink!",
        });
      }, 1500);
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
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-starlink-dark-blue mb-1">
                  {text.fullName}*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={text.placeholders.fullName}
                  className="input-field"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-starlink-dark-blue mb-1">
                  {text.email}*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={text.placeholders.email}
                  className="input-field"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-starlink-dark-blue mb-1">
                  {text.nationality}*
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder={text.placeholders.nationality}
                  className="input-field"
                />
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-starlink-dark-blue mb-1">
                  {text.address}*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder={text.placeholders.address}
                  className="input-field min-h-[100px]"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-starlink-dark-blue mb-1">
                  {text.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={text.placeholders.company}
                  className="input-field"
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex justify-center"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {language === 'en' ? "Processing..." : "Traitement..."}
                    </span>
                  ) : (
                    text.submit
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
