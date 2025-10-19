import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';

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
            <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ background: 'transparent', padding: 0, margin: 0 }}>
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full group-hover:scale-105 transition-transform duration-300"
                preserveAspectRatio={true}
                placeholder={false}
                style={{
                  minHeight: '0',
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  // Mobile-specific improvements
                  width: '100%',
                  height: 'auto'
                }}
              />
              {/* Overlay positioned relative to the image container */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded pointer-events-none">
                DAY {photo.day}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing full-size photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          style={{
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes zoomIn {
                from {
                  transform: scale(0.8);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'zoomIn 0.3s ease-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              transformOrigin: 'center center'
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-white text-black rounded-full w-10 h-10 text-2xl font-bold flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
            >
              ×
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              loading="eager"
              decoding="async"
              className="object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                // Mobile-specific improvements for preserveAspectRatio
                objectFit: 'contain',
                preserveAspectRatio: 'xMidYMid meet'
              }}
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <div className="inline-block bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg">
                <h3 className="text-lg font-semibold">{selectedPhoto.title}</h3>
                <p className="text-sm opacity-80">DAY {selectedPhoto.day}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
