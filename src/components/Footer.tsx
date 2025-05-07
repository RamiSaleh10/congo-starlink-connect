
import React from 'react';

interface FooterProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    rights: "All Rights Reserved",
    disclaimer: "Starlink is a registered trademark of SpaceX. This is an independent registration page."
  },
  fr: {
    rights: "Tous Droits Réservés",
    disclaimer: "Starlink est une marque déposée de SpaceX. Ceci est une page d'inscription indépendante."
  }
};

const Footer = ({ language }: FooterProps) => {
  const text = translations[language];
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-starlink-space-black/90 backdrop-blur-sm text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">© {year} Starlink RDC by BestBuy Congo. {text.rights}</p>
          <p className="text-sm text-gray-400">{text.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
