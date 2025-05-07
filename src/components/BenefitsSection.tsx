import React from 'react';
import { Zap, Wifi, Globe } from 'lucide-react';
interface BenefitsSectionProps {
  language: 'en' | 'fr';
}
const translations = {
  en: {
    heading: "Why Choose Starlink",
    benefits: [{
      icon: Zap,
      title: "High-Speed Internet",
      description: "Experience download speeds from 100 to 200 Mbps, transforming how you work, learn, and play online"
    }, {
      icon: Wifi,
      title: "Low Latency",
      description: "Enjoy responsive connections with latency as low as 20-40ms, perfect for video calls and online gaming"
    }, {
      icon: Globe,
      title: "Works Everywhere",
      description: "Stay connected in remote areas, urban centers, and everywhere in between across DR Congo"
    }]
  },
  fr: {
    heading: "Pourquoi Choisir Starlink",
    benefits: [{
      icon: Zap,
      title: "Internet Haut Débit",
      description: "Profitez de vitesses de téléchargement de 100 à 200 Mbps, transformant votre façon de travailler, d'apprendre et de jouer en ligne"
    }, {
      icon: Wifi,
      title: "Faible Latence",
      description: "Bénéficiez de connexions réactives avec une latence aussi basse que 20-40ms, parfaite pour les appels vidéo et les jeux en ligne"
    }, {
      icon: Globe,
      title: "Fonctionne Partout",
      description: "Restez connecté dans les zones reculées, les centres urbains et partout entre les deux à travers la RD Congo"
    }]
  }
};
const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  language
}) => {
  const text = translations[language];
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-16 bg-[#ededed]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-starlink-dark-blue text-center mb-10 cursor-pointer hover:text-starlink-light-blue transition-colors" onClick={scrollToProducts}>
          {text.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.benefits.map((benefit, index) => <div key={index} onClick={scrollToProducts} className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-neutral-100">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-starlink-light-blue rounded-full mb-4">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-starlink-dark-blue mb-3 cursor-pointer hover:text-starlink-light-blue transition-colors" onClick={scrollToProducts}>
                  {benefit.title}
                </h3>
                <p className="text-starlink-slate">{benefit.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default BenefitsSection;