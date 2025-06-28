import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import EmotionalHook from '../components/EmotionalHook';
import HowItWorks from '../components/HowItWorks';
import InteractiveDemo from '../components/InteractiveDemo';
import Testimonials from '../components/Testimonials';
import Trust from '../components/Trust';
import FeedbackForm from '../components/FeedbackForm';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <EmotionalHook />
      <HowItWorks />
      <InteractiveDemo />
      <Testimonials />
      <Trust />
      <FeedbackForm />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default HomePage;