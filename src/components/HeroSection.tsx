
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
    <section className="bg-starlink-space-black hero-pattern text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {text.heading}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-starlink-sky-blue animate-fade-in">
            {text.subheading}
          </p>
          <div className="flex justify-center">
            <img 
              src="https://i.imgur.com/uJzWHdz.png" 
              alt="Starlink Dish" 
              className="w-64 md:w-80 object-contain rounded-lg shadow-lg animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
