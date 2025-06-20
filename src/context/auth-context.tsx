
'use client';

import type { User as FirebaseUser, AuthError } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '@/lib/firebase'; // Ensure this path is correct
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  loading: boolean;
  error: AuthError | null;
  signup: (email: string, password: string, displayName: string) => Promise<FirebaseUser | null>;
  login: (email: string, password: string) => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true); // True initially to check auth state
  const [error, setError] = useState<AuthError | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const signup = async (email: string, password: string, displayName: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      // Manually update currentUser as onAuthStateChanged might be slightly delayed
      setCurrentUser({ ...userCredential.user, displayName }); 
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      setError(err as AuthError);
      setLoading(false);
      toast({ title: 'Signup Failed', description: (err as AuthError).message, variant: 'destructive' });
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      setError(err as AuthError);
      setLoading(false);
      toast({ title: 'Login Failed', description: (err as AuthError).message, variant: 'destructive' });
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setLoading(false);
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    } catch (err) {
      setError(err as AuthError);
      setLoading(false);
      toast({ title: 'Logout Failed', description: (err as AuthError).message, variant: 'destructive' });
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
