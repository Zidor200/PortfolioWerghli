import React, { useState } from 'react';

const PhotoGallery = ({ photos = [] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Generate placeholder photos if none provided
  const generatePlaceholderPhotos = () => {
    const placeholderPhotos = [];
    for (let i = 1; i <= 100; i++) {
      placeholderPhotos.push({
        id: i,
        src: `https://placehold.co/400x400/212121/ffffff?text=Photo+${i}`,
        alt: `Photo ${i}`,
        title: `Self Portrait ${i}`,
        day: i
      });
    }
    return placeholderPhotos;
  };

  const displayPhotos = photos.length > 0 ? photos : generatePlaceholderPhotos();

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {displayPhotos.map((photo) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer"
            onClick={() => openModal(photo)}
          >
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg bg-white">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              DAY {photo.day}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing full-size photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{selectedPhoto.title}</h3>
              <p className="text-sm opacity-80">DAY {selectedPhoto.day}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
