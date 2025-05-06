
import React from 'react';

interface BenefitsSectionProps {
  language: 'en' | 'fr';
}

const translations = {
  en: {
    heading: "Why Choose Starlink in DR Congo",
    benefits: [
      {
        title: "High Speed Internet",
        description: "Experience download speeds of 50-200 Mbps, even in remote areas"
      },
      {
        title: "Low Latency",
        description: "With latency as low as 20-40ms, enjoy video calls and online gaming without interruption"
      },
      {
        title: "Easy Setup",
        description: "Simple self-installation with everything needed included in the kit"
      }
    ]
  },
  fr: {
    heading: "Pourquoi Choisir Starlink en RD Congo",
    benefits: [
      {
        title: "Internet Haut Débit",
        description: "Profitez de vitesses de téléchargement de 50 à 200 Mbps, même dans les zones reculées"
      },
      {
        title: "Faible Latence",
        description: "Avec une latence aussi faible que 20-40ms, profitez d'appels vidéo et de jeux en ligne sans interruption"
      },
      {
        title: "Installation Facile",
        description: "Installation simple avec tout le nécessaire inclus dans le kit"
      }
    ]
  }
};

const BenefitsSection = ({ language }: BenefitsSectionProps) => {
  const text = translations[language];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-starlink-dark-blue">
          {text.heading}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.benefits.map((benefit, index) => (
            <div key={index} className="bg-starlink-light-gray p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-3 text-starlink-dark-blue">{benefit.title}</h3>
              <p className="text-starlink-slate">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
