'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function OwnerSignupPage() {
  const [pageLoading, setPageLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { signup, loading: authLoading } = useAuth();

  const handleSignup = async (values: any) => {
    setPageLoading(true);
    try {
      // Here you might add logic to create an "owner" role in your database
      // For now, we just create a standard user
      const user = await signup(values.email, values.password, values.name);
      if (user) {
        toast({
          title: 'Owner Account Created!',
          description: 'Your account is ready. Please log in to continue.',
        });
        router.push('/owner/login'); // Redirect to owner login after signup
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Owner signup page error:', error);
    }
    setPageLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm 
        type="signup" 
        onSubmit={handleSignup} 
        loading={pageLoading || authLoading}
        userType="owner"
      />
    </AuthLayout>
  );
}
