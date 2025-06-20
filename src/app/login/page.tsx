
'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context'; // Import useAuth

export default function LoginPage() {
  const [pageLoading, setPageLoading] = React.useState(false); // Renamed to avoid conflict
  const { toast } = useToast();
  const router = useRouter();
  const { login, loading: authLoading } = useAuth(); // Get login function and auth loading state

  const handleLogin = async (values: any) => {
    setPageLoading(true);
    try {
      const user = await login(values.email, values.password);
      if (user) {
        toast({
          title: 'Logged In!',
          description: 'Login successful!',
        });
        router.push('/search'); // Redirect to search page
      }
      // Error handling is done within the auth context's login function using toast
    } catch (error) {
      // This catch block might be redundant if auth context handles all errors
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Login page error:', error);
    }
    setPageLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm type="login" onSubmit={handleLogin} loading={pageLoading || authLoading} />
    </AuthLayout>
  );
}
