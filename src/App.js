import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Values from './components/Values';
import Portfolio from './components/Portfolio';
import Steps from './components/Steps';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="antialiased">
      <Header />
      <main className="max-w-7xl mx-auto">
        <Hero />
        <About />
        <VisionMission />
        <Values />
        <Portfolio />
        <Steps />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
