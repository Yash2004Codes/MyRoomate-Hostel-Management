'use client';

import { AuthForm } from '@/components/auth/auth-form';
import AuthLayout from '@/app/auth-layout';
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // Corrected import

// Placeholder for signup server action
async function signupUser(values: any) {
  console.log('Signup attempt with:', values);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate success
  return { success: true, message: 'Account created successfully! Please log in.' };
}


export default function SignupPage() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSignup = async (values: any) => {
    setLoading(true);
    try {
      // Replace with actual signup logic
      const result = await signupUser(values); // Using placeholder
       if (result.success) {
        toast({
          title: 'Account Created!',
          description: result.message,
        });
        router.push('/login'); // Redirect to login after signup
      } else {
        toast({
          title: 'Signup Failed',
          description: result.message || 'Could not create account.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      console.error('Signup error:', error);
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
    </AuthLayout>
  );
}
