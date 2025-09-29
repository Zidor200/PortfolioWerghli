import React from 'react';

const Values = () => {
  return (
    <section id="values" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">

          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl header-font font-bold text-primary-dark mb-6 sm:mb-8">
              MY VALUES
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-primary-dark mb-6 sm:mb-8 leading-relaxed">
              The values that I built in my humble experience that helped me continue my work as a photographer and artist and gain the trust of everyone we dealt with from companies and individual clients, the most prominent of which are:
            </p>

            {/* Values as clickable-looking buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer">
                créativité
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer">
                originalité
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer">
                passion
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer">
                authenticité
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-primary-dark text-primary-dark rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-primary-dark hover:text-white transition-all duration-300 cursor-pointer">
                engagement
              </button>
            </div>
          </div>

          {/* Right Side - Three Portrait Photos */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">

              {/* DAY 75 */}
              <div className="text-center">
                <div className="text-xs sm:text-sm md:text-base font-bold text-primary-dark mb-2 sm:mb-3">
                  DAY 75
                </div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="https://placehold.co/300x400/2d3748/ffffff?text=DAY+75"
                    alt="Day 75 Self Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* DAY 76 */}
              <div className="text-center">
                <div className="text-xs sm:text-sm md:text-base font-bold text-primary-dark mb-2 sm:mb-3">
                  DAY 76
                </div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="https://placehold.co/300x400/065f46/ffffff?text=DAY+76"
                    alt="Day 76 Self Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* DAY 13 */}
              <div className="text-center">
                <div className="text-xs sm:text-sm md:text-base font-bold text-primary-dark mb-2 sm:mb-3">
                  DAY 13
                </div>
                <div className="relative bg-white rounded-lg overflow-hidden shadow-xl aspect-[3/4]">
                  <img
                    src="https://placehold.co/300x400/1e40af/ffffff?text=DAY+13"
                    alt="Day 13 Self Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            {/* MEDALIWERGLI Signature - Bottom Right */}
            <div className="text-right mt-4 sm:mt-6">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark">
                MEDALIWERGLI
              </h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Values;
