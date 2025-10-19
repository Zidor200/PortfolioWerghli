import React, { useState, useEffect, useCallback, useMemo } from 'react';

const InteractiveGallery = ({ photos = [], onShowFullGallery }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0])); // Track loaded images
  const [zoomedImage, setZoomedImage] = useState(null); // Track which image is zoomed

  // Generate placeholder photos if none provided with spread X/Y/Z positions
  const generatePlaceholderPhotos = () => {
    const positions = [
      { x: 0, y: 0, z: 0 },      // photo1 - center
      { x: -200, y: -100, z: -150 }, // photo2 - top left
      { x: 180, y: -80, z: -250 },   // photo3 - top right
      { x: -300, y: 50, z: -100 },   // photo4 - bottom left
      { x: 250, y: 80, z: -200 },    // photo5 - bottom right
      { x: -150, y: 150, z: -300 },  // photo6 - far bottom left
      { x: 320, y: -120, z: -150 },  // photo7 - far top right
      { x: 0, y: -150, z: -400 },    // photo8 - top center back
      { x: -250, y: -50, z: -50 },   // photo9 - middle left
      { x: 200, y: 120, z: -350 },   // photo10 - bottom right back
      { x: -100, y: -200, z: -200 }, // photo11 - far top left
      { x: 300, y: 0, z: -100 },     // photo12 - center right
    ];

    return positions.map((pos, index) => ({
      id: index + 1,
      src: `https://placehold.co/400x500/212121/ffffff?text=Photo+${index + 1}`,
      alt: `Photo ${index + 1}`,
      title: `Self Portrait ${index + 1}`,
      day: index + 1,
      x: pos.x,
      y: pos.y,
      z: pos.z
    }));
  };

  const displayPhotos = photos.length > 0 ? photos : generatePlaceholderPhotos();

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const preloadIndices = [
      currentImageIndex,
      (currentImageIndex + 1) % displayPhotos.length,
      (currentImageIndex - 1 + displayPhotos.length) % displayPhotos.length,
      (currentImageIndex + 2) % displayPhotos.length,
      (currentImageIndex - 2 + displayPhotos.length) % displayPhotos.length
    ];

    preloadIndices.forEach(index => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.src = displayPhotos[index].src;
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
        };
      }
    });
  }, [currentImageIndex, displayPhotos, loadedImages]);

  // Only render images within a certain range of the current image for performance
  const visibleImageIndices = useMemo(() => {
    const range = 5; // Render current + 5 images on each side
    const indices = new Set();
    for (let i = -range; i <= range; i++) {
      const index = (currentImageIndex + i + displayPhotos.length) % displayPhotos.length;
      indices.add(index);
    }
    return indices;
  }, [currentImageIndex, displayPhotos.length]);

  // Navigate to next photo
  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation(); // Prevent body click handler
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentImageIndex + 1) % displayPhotos.length;
    setCurrentImageIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, currentImageIndex, displayPhotos.length]);

  // Navigate to previous photo
  const handlePrevious = useCallback((e) => {
    if (e) e.stopPropagation(); // Prevent body click handler
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = (currentImageIndex - 1 + displayPhotos.length) % displayPhotos.length;
    setCurrentImageIndex(prevIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, currentImageIndex, displayPhotos.length]);

  // Handle image click to zoom
  const handleImageClick = useCallback((photo, e) => {
    e.stopPropagation(); // Prevent body click handler
    setZoomedImage(photo);
  }, []);

  // Close zoomed image
  const closeZoom = useCallback((e) => {
    e.stopPropagation();
    setZoomedImage(null);
  }, []);

  useEffect(() => {
    // Click anywhere to cycle to next photo (only if no zoomed image)
    const handleBodyClick = () => {
      if (!zoomedImage) {
        handleNext();
      }
    };

    // Add click listener to body
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [currentImageIndex, isTransitioning, handleNext, zoomedImage]);

  // Calculate image styles based on current focus
  const getImageStyle = (photo, index) => {
    const isCurrent = index === currentImageIndex;

    // Active photo: centered at X=0, Y=0, Z=200px
    // Non-active photos: use their predefined X/Y/Z positions
    let translateX, translateY, translateZ, opacity, blur, zIndex;

    if (isCurrent) {
      // Active photo - centered and brought forward
      translateX = 0;
      translateY = 0;
      translateZ = 200;
      opacity = 1;
      blur = 0;
      zIndex = 100;
    } else {
      // Non-active photos - use predefined positions spread across canvas
      translateX = photo.x || 0;
      translateY = photo.y || 0;
      translateZ = photo.z || -100;

      // Calculate blur based on Z distance (farther = more blur)
      const distanceFromFocus = Math.abs(translateZ - 200);
      blur = Math.min(distanceFromFocus / 50, 8); // Max blur of 8px

      // Calculate opacity based on Z distance
      opacity = Math.max(0.3, 0.7 - (distanceFromFocus / 1000));

      zIndex = 10 - Math.abs(translateZ / 50);
    }

    return {
      transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
      filter: `blur(${blur}px)`,
      opacity: opacity,
      transition: isTransitioning ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      zIndex: zIndex,
      position: 'absolute',
      maxWidth: '400px',
      width: '400px',
      height: '500px',
      cursor: 'pointer'
    };
  };

  return (
    <div className="interactive-3d-gallery">
      <section
        className="gallery-container"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
          height: '600px',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa'
        }}
      >
        {/* Floating Photos - Only render visible images */}
        {displayPhotos.map((photo, index) => {
          // Skip rendering images outside the visible range
          if (!visibleImageIndices.has(index)) return null;

          const isLoaded = loadedImages.has(index);

          return (
            <div
              key={photo.id}
              className="photo-frame"
              style={{
                ...getImageStyle(photo, index),
                left: '50%',
                top: '50%',
                marginLeft: '-200px',
                marginTop: '-250px'
              }}
            >
              <div
                className="photo-image"
                onClick={(e) => handleImageClick(photo, e)}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  overflow: 'hidden',
                  backgroundColor: isLoaded ? 'white' : '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isLoaded ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      // Mobile-specific improvements for aspect ratio
                      objectPosition: 'center',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                  />
                ) : (
                  <div style={{
                    color: '#999',
                    fontSize: '14px'
                  }}>
                    Loading...
                  </div>
                )}
                <div
                  className="photo-label"
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                >
                  DAY {photo.day}
                </div>
              </div>
            </div>
          );
        })}

        {/* Instructions */}
        <div
          className="instructions"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            pointerEvents: 'none'
          }}
        >
          Click anywhere to cycle through photos
        </div>

        {/* Photo Counter */}
        <div
          className="photo-counter"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            pointerEvents: 'none'
          }}
        >
          {currentImageIndex + 1} / {displayPhotos.length}
        </div>

        {/* View Full Gallery Button */}
        {onShowFullGallery && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowFullGallery();
            }}
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              pointerEvents: 'auto',
              transition: 'all 0.3s ease',
              zIndex: 200
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.color = 'black';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
            }}
          >
            View All Photos Gallery →
          </button>
        )}

        {/* Navigation Arrows */}
        {/* Previous Arrow */}
        <button
          onClick={handlePrevious}
          disabled={isTransitioning}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            pointerEvents: 'auto',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            opacity: isTransitioning ? 0.5 : 1,
            zIndex: 200
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Previous photo"
        >
          ←
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isTransitioning ? 'not-allowed' : 'pointer',
            pointerEvents: 'auto',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            opacity: isTransitioning ? 0.5 : 1,
            zIndex: 200
          }}
          onMouseEnter={(e) => {
            if (!isTransitioning) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
          aria-label="Next photo"
        >
          →
        </button>
      </section>

      {/* Zoomed Image Modal */}
      {zoomedImage && (
        <div
          onClick={closeZoom}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
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
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              animation: 'zoomIn 0.3s ease-out'
            }}
          >
            {/* Close button */}
            <button
              onClick={closeZoom}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1001
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Zoomed image */}
            <img
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                objectFit: 'contain',
                // Mobile-specific improvements for preserveAspectRatio
                objectPosition: 'center',
                preserveAspectRatio: 'xMidYMid meet'
              }}
            />

            {/* Image info */}
            <div
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '0',
                right: '0',
                textAlign: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600'
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  display: 'inline-block'
                }}
              >
                {zoomedImage.title} - DAY {zoomedImage.day}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveGallery;
