import React, { useState, useEffect } from 'react';

const InteractiveGallery = ({ photos = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Click anywhere to cycle to next photo
  const handleBodyClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = (currentImageIndex + 1) % displayPhotos.length;
    setCurrentImageIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    // Add click listener to body
    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [currentImageIndex, isTransitioning]);

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
        {/* Floating Photos */}
        {displayPhotos.map((photo, index) => (
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
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                backgroundColor: 'white'
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
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
        ))}

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
      </section>
    </div>
  );
};

export default InteractiveGallery;
