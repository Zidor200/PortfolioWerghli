import React from 'react';

const Steps = () => {
  return (
    <section id="steps" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-subtle-gray border-t border-gray-200">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl section-title header-font font-bold mb-12 sm:mb-14 md:mb-16 text-center">The 4 Steps of Our Collaboration</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-t-4 border-primary-dark hover:shadow-2xl transition duration-300">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 text-primary-dark opacity-20">01</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Understanding the Goals</h3>
          <p className="text-xs sm:text-sm text-mid-gray leading-relaxed">Determine the <strong>commercial and creative goals</strong> of the client (individual, company) to ensure a complete convergence of views and project objectives.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-t-4 border-primary-dark hover:shadow-2xl transition duration-300">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 text-primary-dark opacity-20">02</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Guiding Examples & Vision</h3>
          <p className="text-xs sm:text-sm text-mid-gray leading-relaxed">Collect approximate business models, define the <strong>appropriate color palette, genre</strong> (classic, modern, dramatic), and the general atmosphere required.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-t-4 border-primary-dark hover:shadow-2xl transition duration-300">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 text-primary-dark opacity-20">03</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Planning & Preparation</h3>
          <p className="text-xs sm:text-sm text-mid-gray leading-relaxed">Gather all project elements: actors, accessories, decor, technical personnel, equipment, filming locations, and finalize the <strong>timeline and delivery dates.</strong></p>
        </div>

        {/* Step 4 */}
        <div className="bg-white-card p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-t-4 border-primary-dark hover:shadow-2xl transition duration-300">
          <p className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2 sm:mb-3 text-primary-dark opacity-20">04</p>
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Execution & Delivery</h3>
          <p className="text-xs sm:text-sm text-mid-gray leading-relaxed">Full commitment, post-production (<strong>montage, effects, retouching</strong>), content review, and improving the final storytelling quality.</p>
        </div>
      </div>
    </section>
  );
};

export default Steps;
