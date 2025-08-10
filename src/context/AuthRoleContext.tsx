import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Persona, PersonaInvite, PersonaMembership, PersonaRole } from '../types/persona';
import { readMemberships, readPersonas, upsertPersona, assignMembership, deletePersona, readInvites, createInvite, writeInvites } from '../utils/localStore';
import { deletePersonaAndMemberships } from '../services/supabaseHelpers';
import { supabase } from '../utils/supabaseClient';

interface AuthRoleState {
  currentUserEmail: string | null;
  isSupabaseAuth: boolean;
  personas: Persona[];
  memberships: PersonaMembership[];
  getRoleForPersona: (personaId: string) => PersonaRole | null;
  refresh: () => void;
  addPersona: (persona: Persona) => void;
  setMembership: (personaId: string, userEmail: string, role: PersonaRole) => void;
  removePersona: (personaId: string) => void;
  invites: PersonaInvite[];
  addInvite: (invite: PersonaInvite) => void;
}

const AuthRoleContext = createContext<AuthRoleState | undefined>(undefined);

export function AuthRoleProvider({ children }: { children: React.ReactNode }) {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [isSupabaseAuth, setIsSupabaseAuth] = useState<boolean>(false);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [memberships, setMemberships] = useState<PersonaMembership[]>([]);
  const [invites, setInvites] = useState<PersonaInvite[]>([]);

  useEffect(() => {
    // Seed mock data for demo personas/memberships/invites
    setPersonas(readPersonas());
    setMemberships(readMemberships());
    setInvites(readInvites());

    // Initialize from Supabase auth
    (async () => {
      const { data } = await supabase.auth.getUser();
      const supaEmail = data.user?.email ?? null;
      if (supaEmail) {
        setCurrentUserEmail(supaEmail);
        setIsSupabaseAuth(true);
        // Ignore demo data when authenticated; keep demo in localStorage for later
        setPersonas([]);
        setMemberships([]);
        setInvites([]);
      } else {
        // Fallback to local demo auth
        try {
          const raw = localStorage.getItem('userInfo');
          const parsed = raw ? JSON.parse(raw) : null;
          setCurrentUserEmail(parsed?.email ?? null);
          setIsSupabaseAuth(false);
        } catch {
          setCurrentUserEmail(null);
          setIsSupabaseAuth(false);
        }
      }
    })();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const email = session?.user?.email ?? null;
      setCurrentUserEmail(email);
      if (email) {
        setIsSupabaseAuth(true);
        setPersonas([]);
        setMemberships([]);
        setInvites([]);
      } else {
        setIsSupabaseAuth(false);
        // Re-load demo data for demo mode
        setPersonas(readPersonas());
        setMemberships(readMemberships());
        setInvites(readInvites());
      }
    });

    const onDemoAuthChanged = () => {
      // Only apply demo fallback if there is no Supabase session
      supabase.auth.getUser().then(({ data: u }) => {
        if (!u.user) {
          try {
            const raw = localStorage.getItem('userInfo');
            const parsed = raw ? JSON.parse(raw) : null;
            setCurrentUserEmail(parsed?.email ?? null);
            setIsSupabaseAuth(false);
          } catch {
            setCurrentUserEmail(null);
            setIsSupabaseAuth(false);
          }
        }
      });
    };
    window.addEventListener('ds-auth-changed', onDemoAuthChanged as EventListener);

    return () => {
      data?.subscription?.unsubscribe?.();
      window.removeEventListener('ds-auth-changed', onDemoAuthChanged as EventListener);
    };
  }, []);

  const refresh = () => {
    setPersonas(readPersonas());
    setMemberships(readMemberships());
    setInvites(readInvites());
  };

  const addPersona = (persona: Persona) => {
    upsertPersona(persona);
    setPersonas(prev => {
      const idx = prev.findIndex(p => p.id === persona.id);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = persona;
        return copy;
      }
      return [...prev, persona];
    });
  };

  const setMembership = (personaId: string, userEmail: string, role: PersonaRole) => {
    assignMembership(personaId, userEmail, role);
    setMemberships(prev => {
      const idx = prev.findIndex(m => m.personaId === personaId && m.userEmail === userEmail);
      if (idx >= 0) {
        const copy = prev.slice();
        copy[idx] = { ...copy[idx], role };
        return copy;
      }
      return [...prev, { personaId, userEmail, role }];
    });
  };

  const removePersona = (personaId: string) => {
    if (isSupabaseAuth) {
      // Fire and forget; UI already filtered by owner role
      deletePersonaAndMemberships(personaId).catch(() => {});
    } else {
      deletePersona(personaId);
    }
    setPersonas(prev => prev.filter(p => p.id !== personaId));
    setMemberships(prev => prev.filter(m => m.personaId !== personaId));
    setInvites(prev => prev.filter(i => i.personaId !== personaId));
  };

  const addInvite = (invite: PersonaInvite) => {
    createInvite(invite);
    setInvites(prev => [...prev, invite]);
  };

  const getRoleForPersona = useMemo(() => {
    return (personaId: string): PersonaRole | null => {
      if (!currentUserEmail) return null;
      const m = memberships.find(
        x => x.personaId === personaId && x.userEmail === currentUserEmail
      );
      return m?.role ?? null;
    };
  }, [currentUserEmail, memberships]);

  const value: AuthRoleState = {
    currentUserEmail,
    isSupabaseAuth,
    personas,
    memberships,
    getRoleForPersona,
    refresh,
    addPersona,
    setMembership,
    removePersona,
    invites,
    addInvite,
  };

  return (
    <AuthRoleContext.Provider value={value}>{children}</AuthRoleContext.Provider>
  );
}

export function useAuthRole(): AuthRoleState {
  const ctx = useContext(AuthRoleContext);
  if (!ctx) throw new Error('useAuthRole must be used within AuthRoleProvider');
  return ctx;
}


