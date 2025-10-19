import React from 'react';
import OptimizedImage from './OptimizedImage';

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Left Column - Portrait Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <OptimizedImage
                src="/images/IMG_8586-1.jpg"
                alt="Medali Wergli portrait"
                className="w-full h-auto rounded-lg shadow-2xl"
                enableZoom={true}
                title="Medali Wergli Portrait"
                preserveAspectRatio={false}
                fillContainer={true}
              />
              {/* Background effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/20 rounded-lg pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-between h-full">
            <div>
              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl header-font font-bold text-primary-dark mb-8 sm:mb-10 text-center lg:text-left">
                ABOUT ME
              </h2>

              {/* Presentation Section */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-4 sm:mb-6 uppercase tracking-wide">
                  PRESENTATION
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-primary-dark leading-relaxed">
                  Salam I'm mohamed ali wergli I'm excited to share my self-portrait with you. This piece is a reflection of who I am, my emotions, and my journey. Creating a self-portrait has been a deeply personal and introspective process, and I'm thrilled to walk you through the inspiration, symbolism, and techniques behind it.
                </p>
              </div>

              {/* Career & Training Section */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark mb-4 sm:mb-6 uppercase tracking-wide">
                  MY CAREER & MY TRAINING
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    My career began in 2015 in phone photography, specializing in street photography, while continuing self-training.
                  </p>
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    In 2017, I transitioned to DSLR cameras, complemented by paid follow-up online lessons and intensive training in image editing, visual composition, color theory, and creative application.
                  </p>
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    In 2018, I joined the Academy of Arts in Carthage (known as Université Centrale until 2021).
                  </p>
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    From 2021 to 2022, I worked as a videographer at Al Janoubiya TV.
                  </p>
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    In 2022, I launched my artistic project focused on self-portraits, alongside freelance work as a product, events, and portrait photographer, including studio photography.
                  </p>
                  <p className="text-sm sm:text-base text-primary-dark leading-relaxed">
                    In 2024, I collaborated with the Royal Saif Al-Sham Band.
                  </p>
                </div>
              </div>
            </div>

            {/* Signature at bottom right */}
            <div className="mt-auto pt-6 sm:pt-8">
              <div className="text-right">
                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl header-font font-bold text-primary-dark">
                  MEDALIWERGLI
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
