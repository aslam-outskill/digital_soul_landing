import React, { useState } from 'react';
import { MessageCircle, Calendar, Mic, Image as ImageIcon, Play, Pause, Heart, User, Bot, Paperclip, Send, Clock } from 'lucide-react';

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoInput, setDemoInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDemoSend = () => {
    if (!demoInput.trim()) return;
    chatMessages.push({ type: 'user', text: demoInput.trim() });
    setDemoInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      chatMessages.push({
        type: 'soul',
        text:
          "That's wonderful to hear! I love connecting with family and friends. Is there anything specific you'd like to talk about or any memories you'd like to share?",
      });
    }, 900);
  };

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
              <div className="flex flex-col" style={{ minHeight: 420 }}>
                {/* Header aligned with real chat */}
                <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Sarah Johnson</h3>
                      <p className="text-xs text-gray-600">Digital Soul • Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-purple-600' : 'bg-gray-200'}`}>
                          {message.type === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                        <div className={`${message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-white text-gray-900 border border-gray-200'} rounded-2xl px-4 py-2`}>
                          <p className="text-sm">{message.text}</p>
                          <div className={`flex items-center space-x-1 mt-1 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <Clock className="w-3 h-3 opacity-60" />
                            <span className={`text-xs opacity-60 ${message.type === 'user' ? 'text-white' : 'text-gray-500'}`}>{formatTime(new Date())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input aligned with real chat */}
                <div className="bg-white border-t border-gray-200 px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                      <input
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleDemoSend}
                      disabled={!demoInput.trim()}
                      className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
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