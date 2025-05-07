
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import RegistrationForm from '@/components/RegistrationForm';
import ThankYouMessage from '@/components/ThankYouMessage';
import Footer from '@/components/Footer';

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleLanguageChange = (lang: 'en' | 'fr') => {
    setLanguage(lang);
  };
  
  const handleFormSubmitSuccess = () => {
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setFormSubmitted(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="flex-grow pt-16">
        <HeroSection language={language} />
        <BenefitsSection language={language} />
        
        {formSubmitted ? (
          <ThankYouMessage language={language} onReset={handleReset} />
        ) : (
          <RegistrationForm language={language} onSubmitSuccess={handleFormSubmitSuccess} />
        )}
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Index;
