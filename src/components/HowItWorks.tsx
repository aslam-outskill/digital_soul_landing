import React, { useState } from 'react';
import { Upload, Brain, Share2, ArrowRight } from 'lucide-react';
import AuthModal from './auth/AuthModal';

const HowItWorks = () => {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; view: 'login' | 'register' }>({
    isOpen: false,
    view: 'register'
  });

  const openAuthModal = () => {
    setAuthModal({ isOpen: true, view: 'register' });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, view: 'register' });
  };

  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Record & Upload",
      description: "Share your photos, videos, voice recordings, and written memories. Our secure platform safely stores everything.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Reflect & Build",
      description: "Our AI thoughtfully processes your content, learning your voice, personality, and the essence of who you are.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Share or Save",
      description: "Create an interactive Digital Soul that family and friends can connect with, or keep private for personal reflection.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <>
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Creating your Digital Soul is simple, secure, and deeply personal
            </p>
          </div>

          <div className="relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={openAuthModal}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        initialView={authModal.view}
      />
    </>
  );
};

export default HowItWorks;