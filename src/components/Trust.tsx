import React from 'react';
import { Shield, Lock, Users, Award, Check } from 'lucide-react';

const Trust = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Level Security",
      description: "Your memories are encrypted end-to-end and stored with military-grade security protocols."
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Complete Privacy Control",
      description: "You decide who can access your Digital Soul. Share publicly, privately, or keep it just for yourself."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family-First Design",
      description: "Built specifically for families to connect across generations, not for corporate data harvesting."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Ethical AI Commitment",
      description: "Our AI is trained responsibly, respects your dignity, and never shares your data with third parties."
    }
  ];

  const principles = [
    "Your data belongs to you, always",
    "No advertising or data selling, ever",
    "Complete transparency in how AI processes your content",
    "Option to download or delete everything anytime",
    "Secure inheritance features for family access"
  ];

  return (
    <section id="trust" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 rounded-full px-6 py-3 mb-6">
            <Shield className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Built with Ethical AI</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Your Trust Is
            <br />
            <span className="text-purple-400">Our Foundation</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            We understand you're entrusting us with your most precious memories. 
            Here's how we protect and honor that trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex p-4 rounded-2xl bg-purple-900/30 text-purple-400 mb-4 group-hover:bg-purple-800/40 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">
              Our Privacy Principles
            </h3>
            <div className="space-y-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-300 text-lg">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Questions about privacy or security?
          </p>
          <button className="text-purple-400 hover:text-purple-300 font-medium underline underline-offset-4 transition-colors">
            Read our full Privacy Policy
          </button>
        </div>
      </div>
    </section>
  );
};

export default Trust;