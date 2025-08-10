import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff,
  Paperclip, 
  Heart, 
  User,
  Bot,
  Clock,
  Volume2,
  VolumeX
} from 'lucide-react';
import Logo from '../components/Logo';
import { useAuthRole } from '../context/AuthRoleContext';
import { getCurrentUserId, listMyMemberships, listMyPersonas } from '../services/supabaseHelpers';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const { currentUserEmail, isSupabaseAuth, personas, memberships } = useAuthRole();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [personaName, setPersonaName] = useState<string>('');
  const [personaId, setPersonaId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasWelcomedRef = useRef<boolean>(false);
  
  // Speech recognition and synthesis
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    const anyWindow = window as unknown as Record<string, any>;
    if ('webkitSpeechRecognition' in anyWindow || 'SpeechRecognition' in anyWindow) {
      const SpeechRecognition = anyWindow.SpeechRecognition || anyWindow.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthesisRef.current = window.speechSynthesis;
  }, []);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to top and auth gate
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUserEmail) {
      const isDemo = !isSupabaseAuth && !!JSON.parse(localStorage.getItem('userInfo') || 'null')?.isDemo;
      setUserInfo({ email: currentUserEmail, isDemo });
    } else {
      const raw = localStorage.getItem('userInfo');
      if (raw) setUserInfo(JSON.parse(raw)); else navigate('/');
    }
    if (!hasWelcomedRef.current) {
      hasWelcomedRef.current = true;
      setTimeout(() => {
        addBotMessage("Hello! It's wonderful to connect with you. How are you doing today? You can speak to me by clicking the microphone button.");
      }, 500);
    }
  }, [navigate, currentUserEmail, isSupabaseAuth]);

  // Resolve persona target from URL first
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('personaId');
    const nm = params.get('name');
    if (pid) setPersonaId(pid);
    if (nm) setPersonaName(nm);
  }, []);

  // Load persona name (live or demo) - prefer most recent when not specified
  useEffect(() => {
    (async () => {
      if (userInfo?.isDemo) {
        setPersonaName('Sarah Johnson');
        return;
      }
      if (!currentUserEmail) return;
      if (isSupabaseAuth) {
        try {
          const [uid, liveP, liveM] = await Promise.all([
            getCurrentUserId(),
            listMyPersonas(),
            listMyMemberships(),
          ]);
          if (!uid) return;
          const memberIds = new Set(liveM.map(m => m.persona_id));
          const candidates = liveP.filter(p => p.created_by === uid || memberIds.has(p.id));
          const target = (personaId ? candidates.find(p => p.id === personaId) : undefined) ||
                        (candidates.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]) ||
                        liveP[0];
          if (target) setPersonaName(target.name || 'Chat');
        } catch {
          setPersonaName('Chat');
        }
      } else {
        const myIds = new Set(
          memberships.filter(m => m.userEmail === currentUserEmail).map(m => m.personaId)
        );
        const candidates = personas.filter(p => myIds.has(p.id));
        const target = (personaId ? candidates.find(p => p.id === personaId) : undefined) ||
                       (candidates.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]) ||
                       personas[0];
        if (target) setPersonaName((target as any).subjectFullName || 'Chat');
      }
    })();
  }, [isSupabaseAuth, currentUserEmail, userInfo, personas, memberships, personaId]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Speak the message if voice is enabled
    if (voiceEnabled && synthesisRef.current) {
      speakMessage(text);
    }
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const speakMessage = (text: string) => {
    if (synthesisRef.current && voiceEnabled) {
      setIsSpeaking(true);
      
      // Cancel any ongoing speech
      synthesisRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to find a female voice for Sarah
      const voices = synthesisRef.current.getVoices();
      const femaleVoice = voices.find((voice: any) => 
        voice.name.includes('female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Victoria')
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 0.9; // Slightly slower for more natural speech
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthesisRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (synthesisRef.current && !voiceEnabled) {
      synthesisRef.current.cancel();
    }
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Demo responses based on user input
      const lowerMessage = userMessage.toLowerCase();
      let response = "";
      
      if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you feel')) {
        response = "I'm doing wonderfully, thank you for asking! I'm so grateful to be able to connect with you. How about you?";
      } else if (lowerMessage.includes('apple pie') || lowerMessage.includes('recipe')) {
        response = "Oh, my apple pie! I used to make it with love for every family gathering. The secret was using Granny Smith apples and a pinch of cinnamon. Would you like me to share the recipe?";
      } else if (lowerMessage.includes('story') || lowerMessage.includes('memory')) {
        response = "I have so many wonderful memories! One of my favorites was when I was a young girl in the 1950s. We didn't have much, but we had each other. My mother taught me that love and family are the most precious things in life.";
      } else if (lowerMessage.includes('advice') || lowerMessage.includes('wisdom')) {
        response = "My dear, life is a beautiful journey. Always be kind to others, cherish your family, and never forget that every challenge makes you stronger. What's on your mind?";
      } else if (lowerMessage.includes('family') || lowerMessage.includes('grandchildren')) {
        response = "Family is everything to me. I used to call all my grandchildren every Sunday to check in. There's nothing more precious than hearing their voices and knowing they're safe and happy.";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = "Hello there! It's so lovely to hear from you. I'm here whenever you need someone to talk to or share memories with.";
      } else if (lowerMessage.includes('voice') || lowerMessage.includes('speak')) {
        response = "Yes, I can speak to you! I love using my voice to connect with family. It makes our conversations feel more personal and warm.";
      } else {
        response = "That's wonderful to hear! I love connecting with family and friends. Is there anything specific you'd like to talk about or any memories you'd like to share?";
      }
      
      addBotMessage(response);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSendMessage = (text?: string) => {
    const messageToSend = text || inputText;
    if (messageToSend.trim()) {
      addUserMessage(messageToSend.trim());
      simulateBotResponse(messageToSend.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo className="w-8 h-8" textClassName="text-xl text-gray-900" />
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16 h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{personaName || (userInfo?.isDemo ? 'Sarah Johnson' : 'Chat')}</h1>
              <p className="text-sm text-gray-600">Digital Soul • Online</p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              {userInfo?.isDemo && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Demo Mode
                </span>
              )}
              <button
                onClick={toggleVoice}
                className={`p-2 rounded-full transition-colors ${
                  voiceEnabled 
                    ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-gray-600">Starting conversation...</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-purple-600' 
                    : 'bg-gray-200'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <div className={`flex items-center space-x-1 mt-1 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <Clock className="w-3 h-3 opacity-60" />
                    <span className={`text-xs opacity-60 ${
                      message.sender === 'user' ? 'text-white' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
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

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or click the microphone to speak..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={!recognitionRef.current}
              className={`p-3 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Voice Status */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              {isListening && (
                <span className="flex items-center space-x-1 text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Listening...</span>
                </span>
              )}
              {isSpeaking && (
                <span className="flex items-center space-x-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Speaking...</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {voiceEnabled && (
                <span className="flex items-center space-x-1">
                  <Volume2 className="w-3 h-3" />
                  <span>Voice enabled</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
