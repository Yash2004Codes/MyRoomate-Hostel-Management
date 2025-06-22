'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Accommodation } from '@/types';
import { getAccommodationsByOwnerId } from '@/lib/accommodations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PlusCircle, Building } from 'lucide-react';
import { AccommodationRow } from '@/components/owner/accommodation-row';
import Link from 'next/link';

export default function OwnerDashboardPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/owner/login');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      // In a real app, currentUser.uid would be used.
      // For mock data, we use a hardcoded ownerId added to the mock data.
      const mockOwnerId = "owner-1"; 
      getAccommodationsByOwnerId(mockOwnerId) // Using mock for now
        .then(data => {
          setAccommodations(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (authLoading || loading || !currentUser) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-headline text-primary">Your Dashboard</h1>
        <Button asChild>
            <Link href="/owner/listings/new"> {/* Placeholder for future add new page */}
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Listing
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Building className="mr-3 h-6 w-6"/>My Listings</CardTitle>
          <CardDescription>Here you can view and manage your accommodation listings.</CardDescription>
        </CardHeader>
        <CardContent>
            {accommodations.length > 0 ? (
                 <div className="space-y-4">
                    {accommodations.map(acc => (
                        <AccommodationRow key={acc.id} accommodation={acc} />
                    ))}
                 </div>
            ): (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You haven't listed any properties yet.</p>
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
