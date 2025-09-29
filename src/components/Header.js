import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header id="navbar" className="sticky top-0 z-50 bg-white-card/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="flex justify-between items-center py-4">
          <h1 className="text-lg sm:text-xl font-serif font-bold text-primary-dark tracking-wider">
            M. WERGLI
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <div className="flex space-x-4 lg:space-x-8 text-sm font-semibold text-mid-gray">
              <a href="#latest" className="hover:text-primary-dark transition duration-150">My Latest</a>
              <a href="#best" className="hover:text-primary-dark transition duration-150">My Best</a>
              <a href="#other" className="hover:text-primary-dark transition duration-150">Other Creations</a>
            </div>
            <a href="#contact" className="px-4 py-2 bg-primary-dark text-white text-sm font-semibold rounded-lg hover:bg-black transition duration-300 shadow-md">
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-primary-dark hover:text-black transition duration-150"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4 border-t border-gray-100">
            <a
              href="#latest"
              className="block text-sm font-semibold text-mid-gray hover:text-primary-dark transition duration-150"
              onClick={closeMenu}
            >
              My Latest
            </a>
            <a
              href="#best"
              className="block text-sm font-semibold text-mid-gray hover:text-primary-dark transition duration-150"
              onClick={closeMenu}
            >
              My Best
            </a>
            <a
              href="#other"
              className="block text-sm font-semibold text-mid-gray hover:text-primary-dark transition duration-150"
              onClick={closeMenu}
            >
              Other Creations
            </a>
            <a
              href="#contact"
              className="inline-block px-4 py-2 bg-primary-dark text-white text-sm font-semibold rounded-lg hover:bg-black transition duration-300 shadow-md"
              onClick={closeMenu}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
