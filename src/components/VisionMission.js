import React from 'react';

const VisionMission = () => {
  return (
    <section className="py-0">
      {/* MY VISION - Top Landscape */}
      <div id="vision" className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
        {/* Background Landscape Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/DAY95.jpg')"
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-end pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-20">
          <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              MY VISION
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed">
              My vision in photography is the ability to <strong>encapsulate a story with its details, feelings and emotions in a single moment.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* MY MISSION - Bottom Landscape */}
      <div id="mission" className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
        {/* Background Landscape Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/day71.jpg')"
          }}
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-start pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20">
          <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              MY MISSION
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed">
              Our mission is to share with our clients the desire and objective "to enable them to sell their products more effectively in larger markets and to obtain a good financial return while maintaining our will to create and innovate in a renewed and innovative way, as well as ensuring our continuity and progress in our field of work."
            </p>
          </div>
        </div>

        {/* MEDALIWERGLI Signature - Bottom Right */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            MEDALIWERGLI
          </h3>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
