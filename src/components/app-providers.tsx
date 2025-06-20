
"use client";

import React from 'react';
import { AuthProvider } from '@/context/auth-context'; // Import AuthProvider

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
