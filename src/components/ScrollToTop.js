import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn ${showButton ? 'show' : ''}`}
      title="Go to top"
      style={{ display: showButton ? 'block' : 'none' }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop;
