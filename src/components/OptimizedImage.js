import React, { useState, useEffect, useRef } from 'react';

/**
 * OptimizedImage Component
 * - Lazy loads images using Intersection Observer
 * - Shows loading placeholder
 * - Smooth fade-in when loaded
 * - Better performance than native lazy loading
 * - Optional click-to-zoom functionality
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  style = {},
  onClick,
  onLoad,
  placeholder = true,
  threshold = 0.1,
  preserveAspectRatio = false,
  enableZoom = false,
  title = null,
  photoData = null,
  fillContainer = false // New prop to explicitly control container filling behavior
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Create Intersection Observer for better lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: threshold
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  const handleImageLoad = (e) => {
    const img = e.target;
    if (preserveAspectRatio && img.naturalWidth > 0 && img.naturalHeight > 0) {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setImageAspectRatio(aspectRatio);
    }
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageClick = (e) => {
    if (enableZoom) {
      e.stopPropagation();
      setIsZoomed(true);
    } else if (onClick) {
      onClick(e);
    }
  };

  const closeZoom = (e) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  // Prevent body scroll when modal is open and handle mobile interactions
  useEffect(() => {
    if (isZoomed) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      // Prevent zoom on double tap for iOS
      const viewport = document.querySelector('meta[name=viewport]');
      const originalContent = viewport?.getAttribute('content') || '';

      if (viewport) {
        viewport.setAttribute('content', originalContent + ', user-scalable=no');
      }

      // Handle escape key
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsZoomed(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';

        // Restore viewport
        if (viewport) {
          viewport.setAttribute('content', originalContent);
        }

        // Remove event listener
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isZoomed]);

  // Handle touch gestures for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      modalRef.current?.setAttribute('data-start-y', touch.clientY.toString());
    }
  };

  const handleTouchEnd = (e) => {
    if (!modalRef.current) return;

    const startY = modalRef.current.getAttribute('data-start-y');
    if (!startY) return;

    if (e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const endY = touch.clientY;
      const deltaY = endY - parseFloat(startY);

      // If user swipes down more than 100px, close modal
      if (deltaY > 100) {
        setIsZoomed(false);
      }
    }

    modalRef.current.removeAttribute('data-start-y');
  };

  return (
    <>
      <div
        ref={imgRef}
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          background: 'transparent',
          cursor: enableZoom ? 'pointer' : style.cursor || 'default',
          ...(preserveAspectRatio && !fillContainer && imageAspectRatio ? {
            aspectRatio: imageAspectRatio.toString(),
            // Ensure container respects aspect ratio on mobile
            minHeight: 0,
            maxHeight: 'none'
          } : {}),
          ...style
        }}
        onClick={handleImageClick}
      >
      {/* Loading Placeholder */}
      {placeholder && !isLoaded && (
        <div
          style={{
            position: (preserveAspectRatio && !fillContainer) ? 'relative' : 'absolute',
            height: (preserveAspectRatio && !fillContainer) ? 'auto' : '100%',
            inset: (preserveAspectRatio && !fillContainer) ? 'auto' : 0,
            background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            ...(preserveAspectRatio && !fillContainer && imageAspectRatio ? {
              aspectRatio: imageAspectRatio.toString()
            } : {}),
            minHeight: (preserveAspectRatio && !fillContainer) ? '150px' : '100%'
          }}
        />
      )}

      {/* Actual Image - only load when in view */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: (preserveAspectRatio && !fillContainer) ? 'auto' : '100%',
            objectFit: (preserveAspectRatio && !fillContainer) ? 'contain' : 'cover',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            margin: 0,
            padding: 0,
            border: 'none',
            outline: 'none',
            // Mobile-specific improvements for aspect ratio
            maxWidth: '100%',
            maxHeight: (preserveAspectRatio && !fillContainer) ? 'none' : '100%'
          }}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Shimmer animation CSS */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
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
    </div>

    {/* Zoom Modal - Mobile First */}
    {enableZoom && isZoomed && (
      <div
        ref={modalRef}
        onClick={closeZoom}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: 'pointer',
          animation: 'fadeIn 0.3s ease-in-out',
          padding: '10px',
          boxSizing: 'border-box',
          touchAction: 'pan-y pinch-zoom'
        }}
      >
        {/* Close button - Mobile positioned */}
        <button
          onClick={() => setIsZoomed(false)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            fontSize: '28px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            zIndex: 10000,
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}
          aria-label="Close"
        >
          ×
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'zoomIn 0.3s ease-out',
            paddingTop: '54px', // Space for close button
            paddingBottom: '80px', // Space for image info
            paddingLeft: '20px',
            paddingRight: '20px',
            boxSizing: 'border-box'
          }}
        >
          {/* Zoomed image - Mobile optimized */}
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              objectFit: 'contain',
              touchAction: 'manipulation',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              // Mobile-specific preserveAspectRatio improvements
              preserveAspectRatio: 'xMidYMid meet',
              objectPosition: 'center',
              display: 'block'
            }}
          />

          {/* Image info - Mobile positioned */}
          {(title || photoData?.title) && (
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                textAlign: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  maxWidth: 'calc(100% - 40px)',
                  wordBreak: 'break-word'
                }}
              >
                {title || photoData?.title || alt}
                {photoData?.day && ` - DAY ${photoData.day}`}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default OptimizedImage;

