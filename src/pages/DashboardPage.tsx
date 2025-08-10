import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Users, Settings, Heart, X } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuthRole } from '../context/AuthRoleContext';
import { listMyMemberships, listMyPersonas, getCurrentUserId, deletePersonaAndMemberships } from '../services/supabaseHelpers';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { personas, memberships, currentUserEmail, removePersona, isSupabaseAuth } = useAuthRole();
  const [livePersonas, setLivePersonas] = useState<any[]>([]);
  const [liveMemberships, setLiveMemberships] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isSupabaseAuth) {
      (async () => {
        try {
          const [uid, p, ms] = await Promise.all([getCurrentUserId(), listMyPersonas(), listMyMemberships()]);
          setCurrentUserId(uid);
          setLivePersonas(p);
          setLiveMemberships(ms);
        } catch {
          setCurrentUserId(null);
          setLivePersonas([]);
          setLiveMemberships([]);
        }
      })();
    } else {
      setCurrentUserId(null);
    }
  }, [isSupabaseAuth]);

  const myPersonas = useMemo(() => {
    if (!currentUserEmail) return [] as any[];
    if (isSupabaseAuth) {
      const ids = new Set(liveMemberships.map(m => m.persona_id));
      return livePersonas.filter(p => ids.has(p.id) || (!!currentUserId && p.created_by === currentUserId));
    } else {
      const ids = memberships
        .filter(m => m.userEmail === currentUserEmail)
        .map(m => m.personaId);
      return personas.filter(p => ids.includes(p.id));
    }
  }, [currentUserEmail, memberships, personas, isSupabaseAuth, livePersonas, liveMemberships, currentUserId]);

  const roleFor = (personaId: string) => {
    if (isSupabaseAuth) {
      const persona = livePersonas.find(x => x.id === personaId);
      if (persona && currentUserId && persona.created_by === currentUserId) return 'OWNER';
      const m = liveMemberships.find(x => x.persona_id === personaId);
      return (m?.role as any) ?? 'VIEWER';
    }
    const m = memberships.find(x => x.personaId === personaId && x.userEmail === currentUserEmail);
    return m?.role ?? 'VIEWER';
  };

  const handleDeletePersona = async (p: any) => {
    const displayName = isSupabaseAuth ? (p.name || 'this persona') : p.subjectFullName
    const confirmed = confirm(`Delete persona "${displayName}"? All data related to this persona will be permanently deleted.`)
    if (!confirmed) return
    try {
      if (isSupabaseAuth) {
        await deletePersonaAndMemberships(p.id)
        setLivePersonas(prev => prev.filter(x => x.id !== p.id))
        setLiveMemberships(prev => prev.filter(x => x.persona_id !== p.id))
      } else {
        removePersona(p.id)
      }
    } catch (e: any) {
      alert(`Failed to delete persona: ${e?.message || 'Unknown error'}`)
    }
  }

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
              <span className="text-sm font-medium text-green-800">Welcome back</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Personas</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, share, and manage digital souls you own or contribute to.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Create new persona card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Create a Persona</h3>
                  <p className="text-gray-600">Start a new digital soul</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                For yourself or for a loved one. Capture memories, voice, and stories.
              </p>
              <button
                onClick={() => navigate('/persona-setup')}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                Create Persona
              </button>
            </div>

            {myPersonas.map(p => (
              <div key={p.id} className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                {roleFor(p.id) === 'OWNER' && (
                  <button
                    aria-label="Delete persona"
                    title="Delete persona"
                    onClick={() => handleDeletePersona(p)}
                    className="absolute top-3 right-3 p-2 rounded-full text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{isSupabaseAuth ? (p.name || 'Unnamed') : p.subjectFullName}</h3>
                    <p className="text-sm text-gray-500">Created {new Date((p.createdAt || p.created_at)).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">my role: {roleFor(p.id).toLowerCase()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">Privacy: {(isSupabaseAuth ? (p.privacy || 'PRIVATE') : p.privacy).toLowerCase()}</p>
                <div className="grid grid-cols-3 gap-3">
                  <button onClick={() => {
                    const nm = isSupabaseAuth ? (p.name || 'Chat') : p.subjectFullName
                    navigate(`/chat?personaId=${encodeURIComponent(p.id)}&name=${encodeURIComponent(nm)}`)
                  }} className="flex items-center justify-center space-x-2 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                  <button onClick={() => navigate('/invite-family')} className="flex items-center justify-center space-x-2 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                    <Users className="w-4 h-4" />
                    <span>Invite</span>
                  </button>
                  <button onClick={() => navigate('/settings')} className="flex items-center justify-center space-x-2 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity placeholder */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <p className="text-sm text-gray-600">Activity will appear here as you create and share personas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
