
import React from 'react';
import { Button } from '@/components/ui/button';

interface ThankYouMessageProps {
  language: 'en' | 'fr';
  onReset: () => void;
}

const translations = {
  en: {
    heading: "Thank You for Your Interest!",
    message: "We've received your inquiry about Starlink service in DR Congo. Our representative will contact you soon with more information.",
    registerAnother: "Submit Another Inquiry",
    additionalInfo: "BestBuy Congo is the official distributor of Starlink in RD Congo, providing high-speed internet solutions across the country."
  },
  fr: {
    heading: "Merci pour Votre Intérêt!",
    message: "Nous avons reçu votre demande concernant le service Starlink en RD Congo. Notre représentant vous contactera bientôt avec plus d'informations.",
    registerAnother: "Soumettre Une Autre Demande",
    additionalInfo: "BestBuy Congo est le distributeur officiel de Starlink en RD Congo, fournissant des solutions internet haut débit dans tout le pays."
  }
};

const ThankYouMessage = ({ language, onReset }: ThankYouMessageProps) => {
  const text = translations[language];
  
  return (
    <section className="py-16 bg-starlink-light-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-starlink-dark-blue">{text.heading}</h2>
          <p className="text-lg mb-8 text-starlink-slate">{text.message}</p>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-md">
            <p className="text-starlink-dark-blue">{text.additionalInfo}</p>
          </div>
          
          <Button 
            onClick={onReset}
            className="btn-primary"
          >
            {text.registerAnother}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThankYouMessage;
