
import React from 'react';

interface HeroSectionProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    heading: "High-Speed Internet Across DR Congo",
    subheading: "Connect to Starlink's satellite internet service for reliable, high-speed access anywhere in DR Congo"
  },
  fr: {
    heading: "Internet Haut Débit à Travers la RD Congo",
    subheading: "Connectez-vous au service internet par satellite de Starlink pour un accès fiable et à haut débit partout en RD Congo"
  }
};

const HeroSection = ({ language }: HeroSectionProps) => {
  const text = translations[language];
  
  return (
    <section 
      className="relative text-white py-32 md:py-48 bg-cover bg-center" 
      style={{ backgroundImage: "url('/lovable-uploads/34c20e2f-dde4-4c84-8442-12a4719b0f1a.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-gradient">
            {text.heading}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-starlink-sky-blue animate-fade-in">
            {text.subheading}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
