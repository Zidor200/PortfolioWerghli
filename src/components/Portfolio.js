import React, { useState } from 'react';
import InteractiveGallery from './InteractiveGallery';
import PhotoGallery from './PhotoGallery';
import OptimizedImage from './OptimizedImage';
import { photos, portfolioPhotos } from '../data/photos';

const Portfolio = () => {
  const [showFullGallery, setShowFullGallery] = useState(false);

  const handleShowGallery = () => {
    setShowFullGallery(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleBackToPortfolio = () => {
    setShowFullGallery(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (showFullGallery) {
    return (
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={handleBackToPortfolio}
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 hover:gap-3"
          >
            ← Back to Portfolio
          </button>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl section-title header-font font-bold mb-8 sm:mb-10 md:mb-12 text-center">
          Complete Gallery - All {photos.length} Photos
        </h2>
        <PhotoGallery photos={photos} />
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl section-title header-font font-bold mb-12 sm:mb-14 md:mb-16 text-center">My Work</h2>

      {/* Interactive 3D Gallery */}
      <div className="mb-16 sm:mb-18 md:mb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-4">
          <h3 className="header-font text-2xl sm:text-3xl md:text-4xl font-bold border-b pb-2 text-center sm:text-left">Interactive Gallery Experience</h3>
          <button
            onClick={handleShowGallery}
            className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Full Gallery →
          </button>
        </div>
        <p className="text-sm sm:text-base text-mid-gray mb-6 sm:mb-8 max-w-4xl mx-auto text-center leading-relaxed">
          Explore my self-portrait collection in an immersive 3D gallery. Click on images or use navigation controls to move through the space with realistic depth of field effects.
        </p>
        <InteractiveGallery photos={photos.slice(0, 20)} onShowFullGallery={handleShowGallery} />
      </div>

      {/* My Latest Creations (Theme 3) */}
      <div id="latest" className="mb-16 sm:mb-18 md:mb-20 pt-4">
        <h3 className="header-font text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 border-b pb-2">My Latest Creations (Theme 3: Infinity Collection)</h3>
        <p className="text-sm sm:text-base text-mid-gray mb-6 sm:mb-8 max-w-4xl leading-relaxed">
          The <strong>(Infinity) collection</strong> is my favorite and the most delicate of all my artistic projects, combining self-portraits and wide landscapes in one moment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portfolioPhotos.latestCreations.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl aspect-square">
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full"
                enableZoom={true}
                title={photo.title}
                photoData={photo}
                preserveAspectRatio={false}
                fillContainer={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* My Best Creations (Creation 1 & 2) */}
      <div id="best" className="mb-16 sm:mb-18 md:mb-20 pt-4 border-t pt-12 sm:pt-14 md:pt-16 border-gray-200">
        <h3 className="header-font text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 border-b pb-2">My Best Creations</h3>

        {/* Creation 1: Tunis Night View */}
        <div className="mb-8 sm:mb-10 bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xl border border-gray-100">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Creation 1: The Tunis Panorama</h4>
          <p className="text-xs sm:text-sm text-mid-gray mb-3 sm:mb-4 leading-relaxed">
            This is a picture of the capital city of Tunis from Mount Sidi Bouhssine and his shrine, which overlooks most of the capital city of Tunis. As for the technical aspect, I collected approximately 14 pictures of this view and combined them into one beautiful scene.
          </p>
          <OptimizedImage
            src={portfolioPhotos.bestCreations.tunisNight}
            alt="Best Creation 1 - Tunis night composite"
            className="w-full rounded-lg shadow-lg"
            style={{ minHeight: '300px' }}
            enableZoom={true}
            title="The Tunis Panorama"
            preserveAspectRatio={false}
            fillContainer={true}
          />
        </div>

        {/* Creation 2: Concentration Flow */}
        <div className="bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-xl border border-gray-100">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Creation 2: Moment of Concentration</h4>
          <p className="text-xs sm:text-sm text-mid-gray mb-3 sm:mb-4 leading-relaxed">
            This is a translation of a moment of concentration and mental flow that I feel when I create a new project, and I expressed it with this atmosphere that I was inspired by my favorite artist and from whom I learned a lot (Eric Alamos).
          </p>
          <OptimizedImage
            src={portfolioPhotos.bestCreations.concentration}
            alt="Best Creation 2 - Concentration scene"
            className="w-full rounded-lg shadow-lg"
            style={{ minHeight: '300px' }}
            enableZoom={true}
            title="Moment of Concentration"
            preserveAspectRatio={false}
            fillContainer={true}
          />
        </div>
      </div>

      {/* Other Creations (Themes 1 & 2) */}
      <div id="other" className="mb-16 sm:mb-18 md:mb-20 pt-4 border-t pt-12 sm:pt-14 md:pt-16 border-gray-200">
        <h3 className="header-font text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 border-b pb-2">Other Creations (Themes 1 & 2)</h3>

        {/* Theme 2: Warm Psychological */}
        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">Theme 2: Warm Psychological State</h4>
        <p className="text-sm sm:text-base text-mid-gray mb-4 sm:mb-6 max-w-4xl leading-relaxed">
          This is a collection of self-portraits, the most prominent of which are warm colors, and it may be a reflection of my active psychological state during this period.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
          {portfolioPhotos.warmTheme.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl aspect-square">
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full"
                enableZoom={true}
                title={photo.title}
                photoData={photo}
                preserveAspectRatio={false}
                fillContainer={true}
              />
            </div>
          ))}
        </div>

        {/* Theme 1: Blue Dominance (Days Project) */}
        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Theme 1: Blue Dominance (Days Project)</h4>
        <p className="text-sm sm:text-base text-mid-gray mb-4 sm:mb-6 max-w-4xl leading-relaxed">
          One of my most beautiful works in the (Days) project. I was influenced during this period by contemplating the sky and its symbolism. The blue color is very dominant, along with my body positions that are almost contemplative.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portfolioPhotos.blueTheme.map((photo) => (
            <div key={photo.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl aspect-square">
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full"
                enableZoom={true}
                title={photo.title}
                photoData={photo}
                preserveAspectRatio={false}
                fillContainer={true}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
