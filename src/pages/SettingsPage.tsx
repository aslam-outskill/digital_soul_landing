import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Shield, 
  Heart, 
  User,
  Bell,
  Eye,
  EyeOff,
  Save,
  Check,
  AlertTriangle,
  Download,
  Trash2,
  Volume2,
  Mic,
  Upload,
  Video as VideoIcon,
  Loader2,
  Play
} from 'lucide-react';
import Logo from '../components/Logo';
import { useAuthRole } from '../context/AuthRoleContext';
import { getCurrentUserId, listMyMemberships, listMyPersonas } from '../services/supabaseHelpers';

interface SettingsData {
  persona: {
    name: string;
    communicationStyle: string;
    privacyLevel: string;
    autoRespond: boolean;
    voiceEnabled: boolean;
    theme: string;
  };
  media: {
    voiceStatus: 'not_started' | 'processing' | 'ready';
    avatarStatus: 'not_started' | 'processing' | 'ready';
    voiceSamples: File[];
    avatarReferences: File[];
    voiceMode: 'upload' | 'read_script';
    scriptRecordings: { blob: Blob; url: string; duration: number }[];
  };
  notifications: {
    newMessages: boolean;
    familyActivity: boolean;
    weeklyDigest: boolean;
    emailNotifications: boolean;
  };
  privacy: {
    profileVisibility: string;
    dataSharing: boolean;
    analytics: boolean;
    thirdPartyAccess: boolean;
  };
  account: {
    email: string;
    password: string;
    twoFactorAuth: boolean;
    sessionTimeout: number;
  };
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const { currentUserEmail, isSupabaseAuth, personas, memberships } = useAuthRole();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('persona');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const mediaStreamRef = React.useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(null);
  const [settings, setSettings] = useState<SettingsData>({
    persona: {
      name: '',
      communicationStyle: 'Warm and encouraging',
      privacyLevel: 'family',
      autoRespond: true,
      voiceEnabled: true,
      theme: 'purple'
    },
    media: {
      voiceStatus: 'not_started',
      avatarStatus: 'not_started',
      voiceSamples: [],
      avatarReferences: [],
      voiceMode: 'upload',
      scriptRecordings: [],
    },
    notifications: {
      newMessages: true,
      familyActivity: true,
      weeklyDigest: false,
      emailNotifications: true
    },
    privacy: {
      profileVisibility: 'family',
      dataSharing: false,
      analytics: true,
      thirdPartyAccess: false
    },
    account: {
      email: 'demo@digitalsoulapp.ch',
      password: '••••••••',
      twoFactorAuth: false,
      sessionTimeout: 30
    }
  });

  // Scroll to top and enforce auth using global auth context
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUserEmail) {
      let isDemo = false;
      if (!isSupabaseAuth) {
        try { isDemo = JSON.parse(localStorage.getItem('userInfo') || 'null')?.isDemo ?? false; } catch {}
      }
      setUserInfo({ email: currentUserEmail, isDemo });
      setSettings(prev => ({ ...prev, account: { ...prev.account, email: currentUserEmail } }));
    } else {
      navigate('/');
    }
  }, [navigate, currentUserEmail, isSupabaseAuth]);

  // Load current persona details
  useEffect(() => {
    const mapPrivacy = (p: string | null | undefined) => {
      if (!p) return 'family';
      const up = p.toString().toUpperCase();
      if (up === 'PRIVATE') return 'private';
      if (up === 'PUBLIC') return 'friends';
      if (up === 'LINK') return 'family';
      return 'family';
    };
    (async () => {
      if (!currentUserEmail) return;
      if (isSupabaseAuth) {
        try {
          const [uid, liveP, liveM] = await Promise.all([
            getCurrentUserId(),
            listMyPersonas(),
            listMyMemberships(),
          ]);
          if (!uid) return;
          const owned = liveP.find(p => p.created_by === uid);
          const firstMember = liveM[0]?.persona_id;
          const target = owned || liveP.find(p => p.id === firstMember) || liveP[0];
          if (target) {
            setSettings(prev => ({
              ...prev,
              persona: {
                ...prev.persona,
                name: target.name || '',
                privacyLevel: mapPrivacy(target.privacy),
              },
            }));
          }
        } catch {
          // ignore
        }
      } else {
        const myIds = memberships
          .filter(m => m.userEmail === currentUserEmail)
          .map(m => m.personaId);
        const target = personas.find(p => myIds.includes(p.id)) || personas[0];
        if (target) {
          setSettings(prev => ({
            ...prev,
            persona: {
              ...prev.persona,
              name: (target as any).subjectFullName || '',
              privacyLevel: (target as any).privacy?.toLowerCase?.() || 'family',
            },
          }));
        }
      }
    })();
  }, [isSupabaseAuth, currentUserEmail, personas, memberships]);

  const handleSettingChange = (category: keyof SettingsData, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert('Settings saved successfully!');
    }, 1500);
  };

  const voicePrompts: string[] = [
    'Please read this paragraph clearly and at a natural pace. Focus on enunciation and tone so we can capture a representative sample of your voice.',
    'Now read a different phrase with some variation in pacing and emotion. Imagine telling a friend about a meaningful memory.',
    'Finally, read this sentence with a warm and friendly tone. Try to keep your voice steady and comfortable.'
  ];

  const cleanupMedia = () => {
    if (mediaRecorderRef.current && isRecording) {
      try { mediaRecorderRef.current.stop(); } catch {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);
    setActivePromptIndex(null);
  };

  useEffect(() => {
    return () => {
      cleanupMedia();
      // Revoke any blob URLs
      settings.media.scriptRecordings.forEach(r => r.url && URL.revokeObjectURL(r.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRecording = async (index: number) => {
    try {
      // Stop any existing
      cleanupMedia();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const chunks: BlobPart[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MediaRecorderCtor: any = (window as any).MediaRecorder;
      const recorder: MediaRecorder = new MediaRecorderCtor(stream);
      mediaRecorderRef.current = recorder;
      setActivePromptIndex(index);
      setIsRecording(true);
      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const next = [...(settings.media.scriptRecordings || [])];
        next[index] = { blob, url, duration: 0 } as any;
        handleSettingChange('media', 'scriptRecordings', next);
        cleanupMedia();
      };
      recorder.start();
    } catch (err) {
      alert('Microphone access denied or unavailable. Please allow mic permissions and try again.');
      cleanupMedia();
    }
  };

  const stopRecording = () => {
    try {
      mediaRecorderRef.current?.stop();
    } catch {}
  };

  const handleExportData = () => {
    const data = {
      persona: settings.persona,
      messages: "Your conversation history would be exported here",
      memories: "Your shared memories and stories would be exported here",
      settings: settings
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'digital-soul-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone and will permanently remove all data.')) {
      alert('Account deletion would be processed here. Redirecting to homepage...');
      navigate('/');
    }
  };

  const tabs = [
    { id: 'persona', label: 'Persona Settings', icon: <Heart className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice & Avatar', icon: <Mic className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <User className="w-4 h-4" /> }
  ];

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-6 py-3 mb-6">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Account Settings</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Settings
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your digital soul preferences, privacy settings, and account configuration.
            </p>
            {userInfo?.isDemo && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 Demo mode: All settings are functional for demonstration
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Persona Settings */}
                {activeTab === 'persona' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Heart className="w-6 h-6 text-purple-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Persona Settings</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Persona Name
                        </label>
                        <input
                          type="text"
                          value={settings.persona.name}
                          onChange={(e) => handleSettingChange('persona', 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Communication Style
                        </label>
                        <select
                          value={settings.persona.communicationStyle}
                          onChange={(e) => handleSettingChange('persona', 'communicationStyle', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Warm and encouraging">Warm and encouraging</option>
                          <option value="Formal and respectful">Formal and respectful</option>
                          <option value="Casual and friendly">Casual and friendly</option>
                          <option value="Wise and philosophical">Wise and philosophical</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Privacy Level
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: 'private', label: 'Private', description: 'Only you can access' },
                          { value: 'family', label: 'Family', description: 'Share with family members' },
                          { value: 'friends', label: 'Friends', description: 'Extend to trusted friends' }
                        ].map((option) => (
                          <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="radio"
                              name="privacyLevel"
                              value={option.value}
                              checked={settings.persona.privacyLevel === option.value}
                              onChange={(e) => handleSettingChange('persona', 'privacyLevel', e.target.value)}
                              className="text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Behavior Settings</h3>
                      
                      <div className="space-y-4">
                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div>
                            <div className="font-medium text-gray-900">Auto-respond to messages</div>
                            <div className="text-sm text-gray-600">Allow this persona to respond automatically when you're away</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.persona.autoRespond}
                            onChange={(e) => handleSettingChange('persona', 'autoRespond', e.target.checked)}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                        </label>

                        <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div>
                            <div className="font-medium text-gray-900">Voice responses</div>
                            <div className="text-sm text-gray-600">Enable spoken responses for this persona</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.persona.voiceEnabled}
                            onChange={(e) => handleSettingChange('persona', 'voiceEnabled', e.target.checked)}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Bell className="w-6 h-6 text-purple-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">New messages</div>
                          <div className="text-sm text-gray-600">Get notified when Sarah sends you a message</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.newMessages}
                          onChange={(e) => handleSettingChange('notifications', 'newMessages', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Family activity</div>
                          <div className="text-sm text-gray-600">Notifications when family members interact with Sarah</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.familyActivity}
                          onChange={(e) => handleSettingChange('notifications', 'familyActivity', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Weekly digest</div>
                          <div className="text-sm text-gray-600">Receive a weekly summary of activity</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.weeklyDigest}
                          onChange={(e) => handleSettingChange('notifications', 'weeklyDigest', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Email notifications</div>
                          <div className="text-sm text-gray-600">Receive notifications via email</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.notifications.emailNotifications}
                          onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Voice & Avatar */
                }
                {activeTab === 'voice' && (
                  <div className="space-y-10">
                    {/* Voice Cloning */}
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <Mic className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Voice Cloning</h2>
                      </div>

                      {/* Mode selector */}
                      <div className="mb-6 inline-flex rounded-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => handleSettingChange('media', 'voiceMode', 'upload')}
                          className={`px-4 py-2 text-sm ${settings.media.voiceMode === 'upload' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                        >
                          Upload Samples
                        </button>
                        <button
                          onClick={() => handleSettingChange('media', 'voiceMode', 'read_script')}
                          className={`px-4 py-2 text-sm ${settings.media.voiceMode === 'read_script' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
                        >
                          Read Script
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          {settings.media.voiceMode === 'upload' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Voice Samples (30–60 seconds total)
                              </label>
                              <div className="space-y-3">
                                {settings.media.voiceSamples.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <Volume2 className="w-5 h-5 text-gray-400" />
                                      <span className="text-sm text-gray-700 truncate max-w-[220px]">{file.name}</span>
                                    </div>
                                    <button
                                      className="text-red-600 hover:text-red-700 text-sm"
                                      onClick={() => {
                                        const next = settings.media.voiceSamples.filter((_, i) => i !== index);
                                        handleSettingChange('media', 'voiceSamples', next);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}

                                <label className="block p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:text-purple-600 transition-colors">
                                  <Upload className="w-6 h-6 mx-auto mb-2" />
                                  <span>Add audio files</span>
                                  <input
                                    type="file"
                                    multiple
                                    accept="audio/*"
                                    onChange={(e) => {
                                      const files = Array.from(e.target.files || []);
                                      handleSettingChange('media', 'voiceSamples', [...settings.media.voiceSamples, ...files]);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          )}

                          {settings.media.voiceMode === 'read_script' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Read the following prompts</label>
                              <div className="space-y-3">
                                {voicePrompts.map((text, i) => {
                                  const rec = settings.media.scriptRecordings[i];
                                  return (
                                    <div key={i} className="p-4 border border-gray-200 rounded-lg">
                                      <p className="text-sm text-gray-700 mb-3">{text}</p>
                                      <div className="flex items-center space-x-2">
                                        {activePromptIndex === i && isRecording ? (
                                          <button
                                            onClick={stopRecording}
                                            className="px-3 py-2 bg-red-600 text-white rounded-lg"
                                          >
                                            Stop
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => startRecording(i)}
                                            className="px-3 py-2 bg-purple-600 text-white rounded-lg"
                                          >
                                            {rec ? 'Retake' : 'Record'}
                                          </button>
                                        )}

                                        {rec && (
                                          <audio controls src={rec.url} className="ml-2" />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                          <p className="text-sm text-gray-600 mb-3">Status</p>
                          {settings.media.voiceStatus === 'not_started' && (
                            <div className="space-y-4">
                              <p className="text-gray-700">No voice profile yet. {settings.media.voiceMode === 'upload' ? 'Upload a few samples' : 'Record the prompts'} and start cloning.</p>
                              <button
                                disabled={settings.media.voiceMode === 'upload' ? settings.media.voiceSamples.length === 0 : (settings.media.scriptRecordings.filter(Boolean).length === 0)}
                                onClick={() => {
                                  handleSettingChange('media', 'voiceStatus', 'processing');
                                  setTimeout(() => handleSettingChange('media', 'voiceStatus', 'ready'), 2000);
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
                              >
                                Start Voice Cloning
                              </button>
                            </div>
                          )}
                          {settings.media.voiceStatus === 'processing' && (
                            <div className="flex items-center space-x-3 text-purple-700">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Processing samples… This may take a minute.</span>
                            </div>
                          )}
                          {settings.media.voiceStatus === 'ready' && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2 text-green-700">
                                <Check className="w-5 h-5" />
                                <span>Voice profile is ready.</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="px-3 py-2 bg-gray-100 rounded-lg flex items-center space-x-2">
                                  <Play className="w-4 h-4" />
                                  <span>Preview</span>
                                </button>
                                <button
                                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg"
                                  onClick={() => handleSettingChange('media', 'voiceStatus', 'not_started')}
                                >
                                  Re-clone Voice
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Video Avatar */}
                    <div>
                      <div className="flex items-center space-x-3 mb-6">
                        <VideoIcon className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Video Avatar</h2>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Reference Video or Photos
                          </label>
                          <div className="space-y-3">
                            {settings.media.avatarReferences.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <VideoIcon className="w-5 h-5 text-gray-400" />
                                  <span className="text-sm text-gray-700 truncate max-w-[220px]">{file.name}</span>
                                </div>
                                <button
                                  className="text-red-600 hover:text-red-700 text-sm"
                                  onClick={() => {
                                    const next = settings.media.avatarReferences.filter((_, i) => i !== index);
                                    handleSettingChange('media', 'avatarReferences', next);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}

                            <label className="block p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:text-purple-600 transition-colors">
                              <Upload className="w-6 h-6 mx-auto mb-2" />
                              <span>Add video or images</span>
                              <input
                                type="file"
                                multiple
                                accept="video/*,image/*"
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  handleSettingChange('media', 'avatarReferences', [...settings.media.avatarReferences, ...files]);
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-4">
                          <p className="text-sm text-gray-600 mb-3">Status</p>
                          {settings.media.avatarStatus === 'not_started' && (
                            <div className="space-y-4">
                              <p className="text-gray-700">No video avatar yet. Upload at least one file and generate.</p>
                              <button
                                disabled={settings.media.avatarReferences.length === 0}
                                onClick={() => {
                                  handleSettingChange('media', 'avatarStatus', 'processing');
                                  setTimeout(() => handleSettingChange('media', 'avatarStatus', 'ready'), 2500);
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
                              >
                                Generate Video Avatar
                              </button>
                            </div>
                          )}
                          {settings.media.avatarStatus === 'processing' && (
                            <div className="flex items-center space-x-3 text-purple-700">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Generating avatar… This may take a few minutes.</span>
                            </div>
                          )}
                          {settings.media.avatarStatus === 'ready' && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2 text-green-700">
                                <Check className="w-5 h-5" />
                                <span>Video avatar is ready.</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="px-3 py-2 bg-gray-100 rounded-lg flex items-center space-x-2">
                                  <Play className="w-4 h-4" />
                                  <span>Preview</span>
                                </button>
                                <button
                                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg"
                                  onClick={() => handleSettingChange('media', 'avatarStatus', 'not_started')}
                                >
                                  Re-generate
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy & Security */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Shield className="w-6 h-6 text-purple-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="private">Private - Only you</option>
                        <option value="family">Family members only</option>
                        <option value="friends">Friends and family</option>
                        <option value="public">Public</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Data & Analytics</h3>
                      
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Data sharing for improvement</div>
                          <div className="text-sm text-gray-600">Help improve the service by sharing anonymous usage data</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.dataSharing}
                          onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Analytics</div>
                          <div className="text-sm text-gray-600">Allow analytics to improve your experience</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.analytics}
                          onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>

                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Third-party access</div>
                          <div className="text-sm text-gray-600">Allow third-party services to access your data</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.privacy.thirdPartyAccess}
                          onChange={(e) => handleSettingChange('privacy', 'thirdPartyAccess', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Privacy Notice</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Your data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <User className="w-6 h-6 text-purple-600" />
                      <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.account.email}
                          onChange={(e) => handleSettingChange('account', 'email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={settings.account.password}
                            onChange={(e) => handleSettingChange('account', 'password', e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout
                      </label>
                      <select
                        value={settings.account.sessionTimeout}
                        onChange={(e) => handleSettingChange('account', 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Security</h3>
                      
                      <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <div className="font-medium text-gray-900">Two-factor authentication</div>
                          <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.account.twoFactorAuth}
                          onChange={(e) => handleSettingChange('account', 'twoFactorAuth', e.target.checked)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                      </label>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <button
                          onClick={handleExportData}
                          className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Data</span>
                        </button>
                        
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center justify-center space-x-2 px-4 py-3 border border-red-300 rounded-xl text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Account</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
