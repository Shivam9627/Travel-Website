import React, { createContext, useContext, useMemo } from 'react';
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

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error('useAuth must be used inside an auth provider');
  }
  return ctx;
}
