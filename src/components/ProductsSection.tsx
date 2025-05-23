
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';

interface ProductsProps {
  language: 'en' | 'fr';
  onInquire: () => void;
}

const translations = {
  en: {
    heading: "Our Starlink Kits",
    subheading: "Explore our range of high-speed internet solutions for any situation",
    standardKit: {
      name: "Standard Kit",
      description: "Reliable high-speed internet for homes and businesses"
    },
    miniKit: {
      name: "Mini Kit",
      description: "Compact, portable, and easy to set up—ideal for travelers and small spaces without compromising on speed"
    },
    flatHpKit: {
      name: "Flat HP Kit",
      description: "Engineered for mobility and harsh environments—perfect for vehicles, boats, and high-demand users on the move"
    },
    inquireButton: "Inquire"
  },
  fr: {
    heading: "Nos Kits Starlink",
    subheading: "Explorez notre gamme de solutions internet à haut débit pour toute situation",
    standardKit: {
      name: "Kit Standard",
      description: "Internet haut débit fiable pour les maisons et les entreprises"
    },
    miniKit: {
      name: "Mini Kit",
      description: "Compact, portable et facile à installer—idéal pour les voyageurs et les petits espaces sans compromis sur la vitesse"
    },
    flatHpKit: {
      name: "Kit HP Plat",
      description: "Conçu pour la mobilité et les environnements difficiles—parfait pour les véhicules, les bateaux et les utilisateurs en déplacement avec des besoins élevés"
    },
    inquireButton: "Se Renseigner"
  }
};

interface ProductCardProps {
  name: string;
  description: string;
  imagePath: string;
  buttonText: string;
  onClick: () => void;
}

const ProductCard = ({ name, description, imagePath, buttonText, onClick }: ProductCardProps) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] hover:shadow-xl flex flex-col h-full">
    <div className="p-4">
      <h3 className="text-xl font-bold text-starlink-dark-blue mb-2">{name}</h3>
    </div>
    <div className="h-64 overflow-hidden">
      <img 
        src={imagePath} 
        alt={name} 
        className="w-full h-full object-contain"
      />
    </div>
    <div className="p-6 flex-grow flex flex-col justify-between">
      <p className="text-starlink-slate mb-4">{description}</p>
      <Button 
        onClick={onClick} 
        className="w-full bg-starlink-light-blue hover:bg-starlink-dark-blue mt-auto"
      >
        {buttonText} <MoveRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const ProductsSection = ({ language, onInquire }: ProductsProps) => {
  const text = translations[language];
  
  const handleInquireClick = () => {
    onInquire();
    
    // Add a small delay to ensure the form is rendered before scrolling
    setTimeout(() => {
      const registerSection = document.getElementById('register');
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  
  return (
    <section className="py-16 bg-starlink-background" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">{text.heading}</h2>
          <p className="text-starlink-light-gray">{text.subheading}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProductCard 
            name={text.standardKit.name}
            description={text.standardKit.description}
            imagePath="/lovable-uploads/d8265ba2-5bd8-4832-afd8-96a9806aaf71.png"
            buttonText={text.inquireButton}
            onClick={handleInquireClick}
          />
          
          <ProductCard 
            name={text.miniKit.name}
            description={text.miniKit.description}
            imagePath="/lovable-uploads/25816ef1-efba-4c3c-9dfc-9c2e0b71dcb0.png"
            buttonText={text.inquireButton}
            onClick={handleInquireClick}
          />
          
          <ProductCard 
            name={text.flatHpKit.name}
            description={text.flatHpKit.description}
            imagePath="/lovable-uploads/3e78cd98-1a1d-4ccf-8671-827259c31dd4.png"
            buttonText={text.inquireButton}
            onClick={handleInquireClick}
          />
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
