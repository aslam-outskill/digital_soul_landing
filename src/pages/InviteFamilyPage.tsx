import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  UserPlus, 
  Users, 
  Check, 
  X,
  Copy,
  Share2,
  Heart,
  Shield,
  Clock,
  User
} from 'lucide-react';
import Logo from '../components/Logo';

interface FamilyMember {
  id: string;
  name: string;
  email: string;
  relationship: string;
  status: 'pending' | 'accepted' | 'declined';
  invitedAt: Date;
  avatar?: string;
}

const InviteFamilyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    relationship: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      navigate('/');
    }

    // Load demo family members for demo user
    if (JSON.parse(storedUserInfo || '{}').isDemo) {
      setFamilyMembers([
        {
          id: '1',
          name: 'Emily Johnson',
          email: 'emily.johnson@email.com',
          relationship: 'Daughter',
          status: 'accepted',
          invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          id: '2',
          name: 'Michael Johnson',
          email: 'michael.johnson@email.com',
          relationship: 'Son',
          status: 'pending',
          invitedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          id: '3',
          name: 'Sophie Johnson',
          email: 'sophie.johnson@email.com',
          relationship: 'Granddaughter',
          status: 'accepted',
          invitedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        }
      ]);
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInviteForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newMember: FamilyMember = {
        id: Date.now().toString(),
        name: inviteForm.name,
        email: inviteForm.email,
        relationship: inviteForm.relationship,
        status: 'pending',
        invitedAt: new Date()
      };

      setFamilyMembers(prev => [...prev, newMember]);
      setInviteForm({ name: '', email: '', relationship: '' });
      setShowInviteForm(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleRemoveMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const handleResendInvite = (email: string) => {
    // Simulate resending invite
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join-family?token=demo123`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedEmail('link');
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'declined':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'declined':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 mb-6">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Family Access</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Invite Family Members
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share access to Sarah's digital soul with your family. They can chat, share memories, and connect with her.
            </p>
            {userInfo?.isDemo && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Demo mode: Pre-filled with sample family members
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowInviteForm(true)}
                className="flex items-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors"
              >
                <UserPlus className="w-6 h-6 text-purple-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Invite by Email</p>
                  <p className="text-sm text-gray-600">Send direct invitation</p>
                </div>
              </button>
              
              <button
                onClick={copyInviteLink}
                className="flex items-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <Share2 className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Copy Invite Link</p>
                  <p className="text-sm text-gray-600">Share via messaging</p>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/contributor?name=Sarah&invitation=demo123')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>Demo Contributor Link</span>
              </button>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <Shield className="w-6 h-6 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Privacy Controls</p>
                  <p className="text-sm text-gray-600">Manage access levels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Family Members List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Family Members</h2>
              <span className="text-sm text-gray-600">
                {familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}
              </span>
            </div>

            {familyMembers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No family members yet</h3>
                <p className="text-gray-600 mb-6">Start by inviting your family to connect with Sarah's digital soul.</p>
                <button
                  onClick={() => setShowInviteForm(true)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Invite First Member
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        <p className="text-xs text-gray-500">{member.relationship}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {getStatusIcon(member.status)}
                        <span className="capitalize">{member.status}</span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Invited</p>
                        <p className="text-xs text-gray-700">{formatDate(member.invitedAt)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {member.status === 'pending' && (
                          <button
                            onClick={() => handleResendInvite(member.email)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Resend invite"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Remove member"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Privacy Notice */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Privacy & Security</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <ul className="space-y-2">
                <li>• Family members can only access what you allow</li>
                <li>• You control all privacy settings</li>
                <li>• Invitations expire after 7 days</li>
              </ul>
              <ul className="space-y-2">
                <li>• Members can be removed at any time</li>
                <li>• All interactions are private and secure</li>
                <li>• Activity logs are available for review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowInviteForm(false)}></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Invite Family Member</h2>
                <button
                  onClick={() => setShowInviteForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={inviteForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter their full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={inviteForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="their.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    name="relationship"
                    required
                    value={inviteForm.relationship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select relationship</option>
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="grandchild">Grandchild</option>
                    <option value="cousin">Cousin</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Invitation'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {copiedEmail && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>
              {copiedEmail === 'link' ? 'Invite link copied!' : 'Invitation sent!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteFamilyPage;
