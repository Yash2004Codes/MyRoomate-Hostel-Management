
'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context'; // Import useAuth

export default function SignupPage() {
  const [pageLoading, setPageLoading] = React.useState(false); // Renamed to avoid conflict
  const { toast } = useToast();
  const router = useRouter();
  const { signup, loading: authLoading } = useAuth(); // Get signup function and auth loading state

  const handleSignup = async (values: any) => {
    setPageLoading(true);
    try {
      const user = await signup(values.email, values.password, values.name);
      if (user) {
        toast({
          title: 'Account Created!',
          description: 'Account created successfully! Please log in.',
        });
        router.push('/login'); // Redirect to login after signup
      }
      // Error handling is done within the auth context's signup function using toast
    } catch (error) {
      // This catch block might be redundant if auth context handles all errors
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Signup page error:', error);
    }
    setPageLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm type="signup" onSubmit={handleSignup} loading={pageLoading || authLoading} />
    </AuthLayout>
  );
}
