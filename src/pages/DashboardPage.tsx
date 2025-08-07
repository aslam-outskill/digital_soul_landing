import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Users, Settings, Heart } from 'lucide-react';
import Logo from '../components/Logo';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-6 py-3 mb-6">
              <Heart className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Digital Soul Created Successfully!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your digital persona is ready. Start connecting and preserving memories with your loved ones.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chat with Digital Soul */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Chat with Digital Soul</h3>
                  <p className="text-gray-600">Start a conversation</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Have meaningful conversations with your digital persona. Ask questions, share memories, and get advice.
              </p>
              <button 
                onClick={() => navigate('/chat')}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Chat
              </button>
            </div>

            {/* Invite Family */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Invite Family</h3>
                  <p className="text-gray-600">Share access</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Invite family members to connect with your digital soul. They can also chat and preserve memories.
              </p>
              <button 
                onClick={() => navigate('/invite-family')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Invite Family
              </button>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Settings className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Settings</h3>
                  <p className="text-gray-600">Manage preferences</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Update your digital soul's preferences, privacy settings, and communication style.
              </p>
              <button 
                onClick={() => navigate('/settings')}
                className="w-full bg-gray-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Manage Settings
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Digital Soul created successfully</p>
                  <p className="text-sm text-gray-600">Your persona is now ready for conversations</p>
                </div>
                <span className="text-sm text-gray-500">Just now</span>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">Persona setup completed</p>
                  <p className="text-sm text-gray-600">All information has been processed</p>
                </div>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
