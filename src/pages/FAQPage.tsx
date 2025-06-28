import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Shield, Heart, Brain, Users, HelpCircle, MessageCircle } from 'lucide-react';
import Logo from '../components/Logo';

const FAQPage = () => {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Heart className="w-5 h-5" />,
      questions: [
        {
          question: "What is a Digital Soul?",
          answer: "A Digital Soul is an AI-powered interactive representation of your memories, voice, and personality. It preserves your stories, wisdom, and essence in a way that allows future generations to connect with you through conversations, voice messages, and shared memories."
        },
        {
          question: "How do I create my Digital Soul?",
          answer: "Creating your Digital Soul is simple: upload photos, videos, and documents that represent your life story, record voice messages and stories, then our AI processes this content to create an interactive experience that captures your unique personality and memories."
        },
        {
          question: "What types of content can I upload?",
          answer: "You can upload photos, videos, audio recordings, written stories, letters, documents, and any digital content that represents your life and memories. Our platform supports most common file formats and helps organize everything into a cohesive digital legacy."
        },
        {
          question: "How long does it take to build my Digital Soul?",
          answer: "The initial setup takes just minutes to start uploading content. Our AI begins processing immediately, and you'll see your Digital Soul taking shape within hours. You can continue adding content over time to make it richer and more complete."
        }
      ]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "How secure is my personal data?",
          answer: "Your data is protected with bank-level encryption, both in transit and at rest. We use military-grade security protocols, and your content is stored in secure, redundant data centers. Only you control who can access your Digital Soul."
        },
        {
          question: "Who owns my Digital Soul and content?",
          answer: "You own all your content and your Digital Soul completely. We never claim ownership of your memories, stories, or any content you upload. You can download, modify, or delete everything at any time."
        },
        {
          question: "Can I control who sees my Digital Soul?",
          answer: "Absolutely. You have complete control over privacy settings. You can keep your Digital Soul completely private, share it with specific family members, or make certain parts public. You decide who can access what content."
        },
        {
          question: "Do you sell my data or show ads?",
          answer: "Never. We don't sell your data, show advertisements, or share your information with third parties. Our business model is based on subscription fees, not data monetization. Your privacy is fundamental to our service."
        }
      ]
    },
    {
      title: "AI & Technology",
      icon: <Brain className="w-5 h-5" />,
      questions: [
        {
          question: "How does the AI voice cloning work?",
          answer: "Our AI analyzes your voice recordings to learn your speech patterns, tone, and personality. It can then generate new messages in your voice while maintaining your authentic speaking style. The technology is designed to be respectful and only creates content you would approve of."
        },
        {
          question: "Can my Digital Soul learn and grow over time?",
          answer: "Yes! As you add more content and memories, your Digital Soul becomes richer and more accurate. The AI continuously learns from new uploads while maintaining the core essence of your personality and memories."
        },
        {
          question: "Is the AI ethical and responsible?",
          answer: "We're committed to ethical AI development. Our technology is designed to honor and respect your memory, never to deceive or manipulate. We're transparent about how the AI works and ensure it only creates content that aligns with your values and personality."
        },
        {
          question: "What happens if the AI makes mistakes?",
          answer: "You can review and edit any AI-generated content before it becomes part of your Digital Soul. We also provide tools to correct or remove any content that doesn't accurately represent you. Your approval is always required for significant additions."
        }
      ]
    },
    {
      title: "Family & Sharing",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "Can multiple family members contribute to one Digital Soul?",
          answer: "Yes! Family members can contribute photos, stories, and memories about a loved one with proper permissions. This creates a richer, more complete Digital Soul that represents how others remember and cherish that person."
        },
        {
          question: "What happens to my Digital Soul when I pass away?",
          answer: "You can designate trusted family members or friends as digital inheritors who will have access to your Digital Soul according to your wishes. We provide secure inheritance features to ensure your legacy is preserved and accessible to future generations."
        },
        {
          question: "Can children interact safely with Digital Souls?",
          answer: "Yes, we have special protections for interactions involving children. Digital Souls can be configured with appropriate content filters, and family members can monitor and guide these interactions to ensure they're positive and meaningful."
        },
        {
          question: "How do I share my Digital Soul with others?",
          answer: "You can generate secure sharing links, invite specific people via email, or create public profiles. Each sharing option comes with customizable privacy controls so you can decide exactly what content each person can access."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo className="w-8 h-8" textClassName="text-xl text-gray-900" />
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 mb-6">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Help & Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about creating and preserving your Digital Soul
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <div className="grid md:grid-cols-2 gap-2">
              {faqCategories.map((category, index) => (
                <a
                  key={index}
                  href={`#category-${index}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-purple-600">{category.icon}</div>
                  <span className="text-gray-700 hover:text-purple-600">{category.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} id={`category-${categoryIndex}`} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-purple-100">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {category.questions.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 100 + itemIndex;
                    const isOpen = openItems.includes(globalIndex);
                    
                    return (
                      <div key={itemIndex}>
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-gray-900 pr-4">
                              {item.question}
                            </h4>
                            <div className="flex-shrink-0">
                              {isOpen ? (
                                <Minus className="w-5 h-5 text-purple-600" />
                              ) : (
                                <Plus className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-5">
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16">
            <div className="bg-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our support team is here to help you create and preserve your digital legacy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:contact@digitalsoulapp.ch"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Support
                  </a>
                  <button
                    onClick={() => navigate('/#feedback')}
                    className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-4 transition-colors"
                  >
                    Send Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
              <p className="text-sm text-gray-600 mb-4">Learn about our privacy protections and ethical guidelines</p>
              <button
                onClick={() => navigate('/privacy-policy')}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Read Privacy Policy →
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">How It Works</h4>
              <p className="text-sm text-gray-600 mb-4">Discover the technology behind Digital Soul</p>
              <button
                onClick={() => navigate('/#how-it-works')}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Learn More →
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Demo</h4>
              <p className="text-sm text-gray-600 mb-4">See Digital Soul in action with interactive examples</p>
              <button
                onClick={() => navigate('/#demo')}
                className="text-pink-600 hover:text-pink-700 font-medium text-sm"
              >
                Try Demo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;