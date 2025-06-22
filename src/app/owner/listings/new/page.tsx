
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { ListingForm } from '@/components/owner/listing-form';
import { addAccommodation } from '@/lib/accommodations';
import { useToast } from '@/hooks/use-toast';
import type { Accommodation } from '@/types';
import { Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for mock data

export default function NewListingPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // In a real app, you would redirect if the user is not authenticated or not an owner.
  // This is a basic check.
  React.useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/owner/login');
    }
  }, [currentUser, authLoading, router]);

  const handleSubmit = async (data: Omit<Accommodation, 'id' | 'ownerId'>) => {
    if (!currentUser) {
        toast({ title: 'Authentication Error', description: 'You must be logged in to create a listing.', variant: 'destructive'});
        return;
    }
    
    setIsSubmitting(true);
    
    const newListing: Accommodation = {
      ...data,
      id: uuidv4(), // Generate a unique ID for the mock data
      ownerId: currentUser.uid,
    };

    try {
      await addAccommodation(newListing);
      toast({
        title: 'Listing Created!',
        description: 'Your new accommodation has been added successfully.',
      });
      router.push('/owner/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create the listing. Please try again.',
        variant: 'destructive'
      });
       setIsSubmitting(false);
    }
  };

  if (authLoading || !currentUser) {
     return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-headline text-primary mb-6">Create a New Listing</h1>
        <ListingForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
