import React from 'react';
import LanguageSelector from './LanguageSelector';
interface HeaderProps {
  language: 'en' | 'fr';
  onLanguageChange: (language: 'en' | 'fr') => void;
}
const Header = ({
  language,
  onLanguageChange
}: HeaderProps) => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <header className="bg-starlink-space-black/90 backdrop-blur-sm py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white cursor-pointer hover:text-starlink-light-blue transition-colors" onClick={scrollToProducts}>Starlink DRC By BestBuy Congo</h1>
        </div>
        <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
      </div>
    </header>;
};
export default Header;