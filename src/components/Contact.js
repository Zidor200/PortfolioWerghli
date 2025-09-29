import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl section-title header-font font-bold mb-4 sm:mb-6">Let's Create Something Impactful.</h2>
      <p className="text-base sm:text-lg md:text-xl text-mid-gray mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
        For commercial inquiries, high-end retouching projects, or collaborative artistic work, contact me directly.
      </p>
      <a
        href="mailto:medaliwergli@example.com"
        className="px-6 sm:px-8 py-3 sm:py-4 bg-primary-dark text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl hover:bg-black transition duration-300 shadow-xl inline-block transform hover:scale-105"
      >
        Contact Mohamedali Werghili
      </a>
      <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-mid-gray">
        medaliwergli@example.com
      </p>
    </section>
  );
};

export default Contact;
