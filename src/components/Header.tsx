
import React from 'react';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  language: 'en' | 'fr';
  onLanguageChange: (language: 'en' | 'fr') => void;
}

const Header = ({ language, onLanguageChange }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-starlink-dark-blue">Starlink Congo</h1>
        </div>
        <LanguageSelector 
          currentLanguage={language} 
          onLanguageChange={onLanguageChange} 
        />
      </div>
    </header>
  );
};

export default Header;
