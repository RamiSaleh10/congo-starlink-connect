
import React from 'react';
import { Globe } from 'lucide-react';

type Language = 'en' | 'fr';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-starlink-dark-blue" />
      <button 
        className={`px-2 py-1 text-sm rounded-md ${currentLanguage === 'en' ? 'bg-starlink-light-blue text-white' : 'text-starlink-dark-blue'}`}
        onClick={() => onLanguageChange('en')}
      >
        EN
      </button>
      <button 
        className={`px-2 py-1 text-sm rounded-md ${currentLanguage === 'fr' ? 'bg-starlink-light-blue text-white' : 'text-starlink-dark-blue'}`}
        onClick={() => onLanguageChange('fr')}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSelector;
