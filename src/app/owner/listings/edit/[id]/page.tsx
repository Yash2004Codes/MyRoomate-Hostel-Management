
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { ListingForm } from '@/components/owner/listing-form';
import { getAccommodationById, updateAccommodation } from '@/lib/accommodations';
import { useToast } from '@/hooks/use-toast';
import type { Accommodation } from '@/types';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditListingPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const [listing, setListing] = useState<Accommodation | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const listingId = params.id as string;

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/owner/login');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    if (listingId) {
      setLoadingData(true);
      getAccommodationById(listingId).then(data => {
        if (data) {
          // In a real app, you'd verify if currentUser.uid === data.ownerId
          setListing(data);
        } else {
          setListing(null); // Not found
        }
      }).finally(() => setLoadingData(false));
    }
  }, [listingId]);

  const handleSubmit = async (data: Omit<Accommodation, 'id' | 'ownerId'>) => {
    if (!listing) return;
    setIsSubmitting(true);
    
    const updatedListing: Accommodation = {
        ...data,
        id: listing.id,
        ownerId: listing.ownerId, // Preserve original owner
    };

    try {
      await updateAccommodation(listingId, updatedListing);
      toast({
        title: 'Listing Updated!',
        description: 'Your accommodation details have been saved.',
      });
      router.push('/owner/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update the listing. Please try again.',
        variant: 'destructive'
      });
      setIsSubmitting(false);
    }
  };
  
  if (authLoading || loadingData) {
     return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!listing) {
    return (
        <main className="container mx-auto px-4 py-8 text-center">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center justify-center">
                        <AlertTriangle className="mr-2 h-6 w-6"/> Listing Not Found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The accommodation you are trying to edit does not exist.</p>
                </CardContent>
            </Card>
        </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-headline text-primary mb-6">Edit Listing</h1>
        <ListingForm 
            onSubmit={handleSubmit}
            initialData={listing}
            isSubmitting={isSubmitting}
        />
      </div>
    </main>
  );
}
