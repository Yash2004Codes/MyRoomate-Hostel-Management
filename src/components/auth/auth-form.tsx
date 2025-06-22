'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  loading: boolean;
  userType?: 'student' | 'owner';
}

const formSchemaBase = {
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
};

const signupSchema = z.object({
  ...formSchemaBase,
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const loginSchema = z.object(formSchemaBase);


export function AuthForm({ type, onSubmit, loading, userType = 'student' }: AuthFormProps) {
  const formSchema = type === 'signup' ? signupSchema : loginSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'signup' && { name: '', confirmPassword: '' }),
    },
  });

  const isSignup = type === 'signup';
  const isOwner = userType === 'owner';

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center text-primary">
          {isOwner ? (isSignup ? 'Owner Registration' : 'Owner Login') : (isSignup ? 'Create Account' : 'Welcome Back!')}
        </CardTitle>
        <CardDescription className="text-center">
           {isOwner 
            ? 'Access your dashboard to manage your listings.'
            : (isSignup ? 'Join College Cribs to find your perfect stay.' : 'Log in to continue your search.')
           }
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            {isSignup && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSignup && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignup ? 'Sign Up' : 'Log In'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {isSignup ? (
                <>
                  Already have an account?{' '}
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={isOwner ? "/owner/login" : "/login"}>Log in</Link>
                  </Button>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{' '}
                  <Button variant="link" asChild className="p-0 h-auto">
                    <Link href={isOwner ? "/owner/signup" : "/signup"}>Sign up</Link>
                  </Button>
                </>
              )}
            </p>
             <p className="text-xs text-center text-muted-foreground mt-2">
                {isOwner ? "Looking for student accommodation?" : "Are you a property owner?"}{' '}
                <Button variant="link" asChild className="p-0 h-auto text-xs">
                    <Link href={isOwner ? "/login" : "/owner/login"}>
                        {isOwner ? "Student Login" : "Owner Login"}
                    </Link>
                </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
