'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/common/header';
import { Filters, type FiltersState } from '@/components/accommodations/filters';
import { AccommodationCard } from '@/components/accommodations/accommodation-card';
import { MapView } from '@/components/accommodations/map-view';
import type { Accommodation } from '@/types';
import { getAllAccommodations, getCollegeCoordinates } from '@/lib/accommodations';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Loader2, Frown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_PAGE = 9;

export default function SearchPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<Accommodation[]>([]);
  const [collegeLocation, setCollegeLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Default to grid view

  const initialFilters: FiltersState = {
    priceRange: { min: 0, max: 30000 },
    distance: 10,
    type: 'all',
    amenities: [],
    searchTerm: '',
  };
  const [currentFilters, setCurrentFilters] = useState<FiltersState>(initialFilters);
  
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


  const fetchAndFilterAccommodations = useCallback(async (filters: FiltersState) => {
    setIsLoading(true);
    setError(null);
    try {
      const allData = await getAllAccommodations(filters);
      setAccommodations(allData); // Store all fetched based on filters
      setFilteredAccommodations(allData.slice(0, ITEMS_PER_PAGE * currentPage)); // Apply pagination to this set
      
      // For map: Assuming first accommodation's college or a default
      if (allData.length > 0 && allData[0].collegeName) {
        const coords = await getCollegeCoordinates(allData[0].collegeName);
        setCollegeLocation(coords);
      } else {
         const defaultCoords = await getCollegeCoordinates("Central University"); // Fallback
         setCollegeLocation(defaultCoords);
      }

    } catch (err) {
      console.error("Failed to fetch accommodations:", err);
      setError("Could not load accommodations. Please try again later.");
      setAccommodations([]);
      setFilteredAccommodations([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);


  useEffect(() => {
    fetchAndFilterAccommodations(currentFilters);
  }, [currentFilters, fetchAndFilterAccommodations]);
  
  useEffect(() => {
    // Update displayed accommodations when page changes, using the already fetched 'accommodations'
    setFilteredAccommodations(accommodations.slice(0, ITEMS_PER_PAGE * currentPage));
  }, [currentPage, accommodations]);


  const handleFiltersChange = (newFilters: FiltersState) => {
    setCurrentFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const totalFetchedItems = accommodations.length;
  const currentlyDisplayedItems = filteredAccommodations.length;


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-2">Find Your Ideal Stay</h1>
          <p className="text-lg text-foreground/80">Search PGs, Hostels, and Apartments near your college.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Filters onFiltersChange={handleFiltersChange} initialFilters={initialFilters} />
          </div>

          <div className="md:col-span-3 space-y-8">
            <MapView accommodations={filteredAccommodations} collegeLocation={collegeLocation} apiKey={googleMapsApiKey} />
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {currentlyDisplayedItems} of {totalFetchedItems} accommodations
              </p>
              <div className="flex items-center gap-2">
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Grid view">
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="List view" disabled> {/* List view TBD */}
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {isLoading && currentlyDisplayedItems === 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-10 w-full mt-2 rounded-md" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10 text-destructive bg-destructive/10 rounded-lg">
                <Frown className="mx-auto h-12 w-12 mb-2" />
                <p className="font-semibold">{error}</p>
              </div>
            ) : filteredAccommodations.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground bg-card rounded-lg">
                <Search className="mx-auto h-12 w-12 mb-2" />
                <p className="font-semibold">No accommodations found matching your criteria.</p>
                <p className="text-sm">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredAccommodations.map(acc => (
                  <AccommodationCard key={acc.id} accommodation={acc} />
                ))}
              </div>
            )}

            {isLoading && currentlyDisplayedItems > 0 && (
              <div className="text-center mt-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Loading more...</p>
              </div>
            )}

            {!isLoading && currentlyDisplayedItems < totalFetchedItems && (
              <div className="mt-8 text-center">
                <Button onClick={loadMore} variant="outline" size="lg">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} College Cribs. All rights reserved.
      </footer>
    </div>
  );
}
