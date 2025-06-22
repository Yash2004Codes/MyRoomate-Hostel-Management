
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import type { Accommodation } from '@/types';
import { getAccommodationsByOwnerId, deleteAccommodation as deleteAccommodationAction } from '@/lib/accommodations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle, Building, Frown, RefreshCw } from 'lucide-react';
import { AccommodationRow } from '@/components/owner/accommodation-row';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

// In a real app, this ID would come from the authenticated user object.
// We use a mock ID here because our mock data has pre-assigned owner IDs.
const MOCK_OWNER_ID = 'mock-owner-uid-1';

export default function OwnerDashboardPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const { toast } = useToast();

  const fetchListings = useCallback(async () => {
    setLoadingData(true);
    try {
      // When connecting to a real backend, you'd use currentUser.uid
      const ownerId = currentUser?.uid || MOCK_OWNER_ID;
      const data = await getAccommodationsByOwnerId(ownerId);
      setAccommodations(data);
    } catch (error) {
      toast({
        title: 'Error fetching listings',
        description: 'Could not load your properties. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoadingData(false);
    }
  }, [currentUser, toast]);


  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/owner/login');
      return;
    }
    if(currentUser) {
        fetchListings();
    }
  }, [currentUser, authLoading, router, fetchListings]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAccommodationAction(id);
      toast({
        title: 'Listing Deleted',
        description: 'The accommodation has been successfully removed.',
      });
      fetchListings(); // Refresh the list after deletion
    } catch (error) {
       toast({
        title: 'Error',
        description: 'Failed to delete the listing.',
        variant: 'destructive',
      });
    }
  };

  if (authLoading || loadingData || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-4xl font-headline text-primary">Your Dashboard</h1>
        <div className="flex gap-2 self-end sm:self-center">
           <Button variant="outline" size="icon" onClick={fetchListings} aria-label="Refresh listings">
             <RefreshCw className="h-5 w-5"/>
           </Button>
            <Button asChild>
                <Link href="/owner/listings/new">
                    <PlusCircle className="mr-2 h-5 w-5" /> Add New Listing
                </Link>
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle className="flex items-center"><Building className="mr-3 h-6 w-6"/>My Listings</CardTitle>
            <div className="text-right">
                <p className="text-sm font-semibold">Current Plan: <span className="text-primary font-bold">Free</span></p>
                <Button variant="link" asChild className="p-0 h-auto text-xs">
                    <Link href="/owner/billing">Upgrade to Premium</Link>
                </Button>
            </div>
          </div>
          <CardDescription>Here you can view, edit, and manage your accommodation listings.</CardDescription>
        </CardHeader>
        <CardContent>
            {accommodations.length > 0 ? (
                 <div className="space-y-4">
                    {accommodations.map(acc => (
                        <AccommodationRow key={acc.id} accommodation={acc} onDelete={handleDelete} />
                    ))}
                 </div>
            ): (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <Frown className="mx-auto h-12 w-12 text-muted-foreground mb-4"/>
                    <p className="text-muted-foreground font-semibold">You haven&apos;t listed any properties yet.</p>
                    <Button variant="link" asChild className="mt-2">
                        <Link href="/owner/listings/new">Add your first listing</Link>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </main>
  );
}
