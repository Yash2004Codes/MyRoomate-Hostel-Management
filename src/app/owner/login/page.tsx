'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function OwnerLoginPage() {
  const [pageLoading, setPageLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login, loading: authLoading } = useAuth();

  const handleLogin = async (values: any) => {
    setPageLoading(true);
    try {
      const user = await login(values.email, values.password);
      if (user) {
        toast({
          title: 'Owner Logged In!',
          description: 'Redirecting to your dashboard.',
        });
        router.push('/owner/dashboard'); // Redirect to owner dashboard
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Owner login page error:', error);
    }
    setPageLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm 
        type="login" 
        onSubmit={handleLogin} 
        loading={pageLoading || authLoading} 
        userType="owner"
      />
    </AuthLayout>
  );
}
