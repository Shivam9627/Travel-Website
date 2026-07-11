import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/react';

const AuthCtx = createContext(null);

export function ClerkAuthInner({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const normalized = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? '',
      name: user.fullName ?? user.username ?? 'Traveler',
      imageUrl: user.imageUrl,
    };
  }, [user]);

  const value = useMemo(
    () => ({
      mode: 'clerk',
      user: normalized,
      isLoaded,
      isSignedIn: !!isSignedIn,
      signOut: () => signOut(),
    }),
    [normalized, isLoaded, isSignedIn, signOut]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function MockAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('demo_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('demo_user');
      }
    }
    setLoaded(true);
  }, []);

  const signIn = async (credentials = {}) => {
    const demoUser = {
      id: credentials.id || 'demo-user',
      email: credentials.email || 'guest@demo.local',
      name: credentials.name || 'Travel Guest',
      imageUrl: '',
    };
    localStorage.setItem('demo_user', JSON.stringify(demoUser));
    setUser(demoUser);
    return demoUser;
  };

  const signUp = async (credentials = {}) => signIn(credentials);
  const signOut = () => {
    localStorage.removeItem('demo_user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      mode: 'demo',
      user,
      isLoaded: loaded,
      isSignedIn: !!user,
      signIn,
      signUp,
      signOut,
    }),
    [loaded, user]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error('useAuth must be used inside an auth provider');
  }
  return ctx;
}
