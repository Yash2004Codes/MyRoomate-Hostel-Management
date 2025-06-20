"use client";

import React from 'react';

// This component can be used to wrap your application with any client-side providers
// like authentication context, theme context, query client for React Query, etc.
// For now, it's a simple pass-through, but it's a good pattern to have.

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Example: If you were using SWR or React Query:
  // const [queryClient] = React.useState(() => new QueryClient())
  // return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

  // Example: If you had an AuthContext:
  // return <AuthContextProvider>{children}</AuthContextProvider>

  return <>{children}</>;
}
