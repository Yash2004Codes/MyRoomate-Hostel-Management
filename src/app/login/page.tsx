'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // Corrected import

// Placeholder for login server action
async function loginUser(values: any) {
  console.log('Login attempt with:', values);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate success/failure
  if (values.email === 'test@example.com' && values.password === 'password') {
    return { success: true, message: 'Login successful!' };
  }
  return { success: false, message: 'Invalid email or password.' };
}


export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      // Replace with actual login logic (e.g., Firebase, NextAuth, custom API)
      const result = await loginUser(values); // Using the placeholder
      if (result.success) {
        toast({
          title: 'Logged In!',
          description: result.message,
        });
        router.push('/search'); // Redirect to search page on successful login
      } else {
        toast({
          title: 'Login Failed',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Login error:', error);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm type="login" onSubmit={handleLogin} loading={loading} />
    </AuthLayout>
  );
}
