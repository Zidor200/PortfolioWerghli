import React from 'react';
import { heroPhotos } from '../data/photos';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gray-50 min-h-screen flex flex-col">
      {/* Top Section - Four Self-Portrait Photos */}
      <div className="flex-1 flex items-center justify-center py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {heroPhotos.map((photo) => (
              <div key={photo.id} className="relative">
                <div className="text-center mb-2 sm:mb-3">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-primary-dark">DAY {photo.day}</span>
                </div>
                <div className="relative bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-xl aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Text and Branding */}
      <div className="bg-white py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-dark mb-4 sm:mb-6">
              HELLO I'M MOHAMEDALIWERGLI
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-dark font-medium">
              photographer and high-end retoucher
            </p>
          </div>

          {/* Bottom Row - Project Info and Dates */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8">
            {/* Left Side - My Project */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-2">
                MY PROJECT
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-primary-dark">
                SELF PORTRAIT
              </p>
            </div>

            {/* Right Side - Years and Name */}
            <div className="text-center sm:text-right">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-2">
                2015-2025
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-primary-dark">
                MEDALI WERGLI
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
