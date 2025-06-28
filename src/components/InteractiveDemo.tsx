import React, { useState } from 'react';
import { MessageCircle, Calendar, Mic, Image as ImageIcon, Play, Pause } from 'lucide-react';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    { id: 'chat', label: 'Chat Interface', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'timeline', label: 'Memory Timeline', icon: <Calendar className="w-5 h-5" /> },
    { id: 'voice', label: 'Voice Clone', icon: <Mic className="w-5 h-5" /> },
    { id: 'gallery', label: 'Photo Gallery', icon: <ImageIcon className="w-5 h-5" /> }
  ];

  const chatMessages = [
    { type: 'user', text: "Tell me about your childhood summers" },
    { type: 'soul', text: "Oh, those were magical times! I remember spending entire days at my grandmother's lake house. The smell of her famous blueberry pancakes would wake me up every morning, and we'd spend hours fishing off the old wooden dock." },
    { type: 'user', text: "What was your favorite memory there?" },
    { type: 'soul', text: "There was this one evening when I was about ten. The sunset painted the whole lake golden, and my grandmother taught me how to skip stones. She said each ripple carried a wish into the universe. I still think about that whenever I see a sunset over water." }
  ];

  const timelineEvents = [
    { year: '1985', title: 'First Day of School', description: 'Walking hand-in-hand with mom to kindergarten' },
    { year: '1992', title: 'Family Road Trip', description: 'Cross-country adventure to the Grand Canyon' },
    { year: '2003', title: 'College Graduation', description: 'Proudest moment with the whole family cheering' },
    { year: '2010', title: 'Wedding Day', description: 'The most beautiful day of my life' }
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1128317/pexels-photo-1128317.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1128316/pexels-photo-1128316.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/1128319/pexels-photo-1128319.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
  ];

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Legacy,
            <br />
            <span className="text-purple-600">In Your Hands</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            See how your Digital Soul comes to life through interactive conversations, 
            cherished memories, and authentic voice preservation
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 shadow-2xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Demo Content */}
          <div className="bg-white rounded-2xl shadow-lg min-h-[400px] overflow-hidden">
            {activeTab === 'chat' && (
              <div className="p-6">
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Ask about a memory..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="p-6">
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{event.year}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="p-6 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-purple-600" />
                      ) : (
                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                      )}
                    </button>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    "Happy Birthday, sweetheart!"
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Your AI voice clone can speak new messages in your authentic voice
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((src, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img
                        src={src}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;