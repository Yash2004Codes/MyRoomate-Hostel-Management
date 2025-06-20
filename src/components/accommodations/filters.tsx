'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { allAmenities, accommodationTypes } from '@/lib/accommodations';
import type { Amenity, AccommodationType } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DollarSign, Route, ListFilter, SearchIcon, RotateCcw } from 'lucide-react';

export interface FiltersState {
  searchTerm?: string;
  priceRange: { min: number; max: number };
  distance: number; // max distance in km
  type: AccommodationType | 'all';
  amenities: Amenity[];
}

interface FiltersProps {
  onFiltersChange: (filters: FiltersState) => void;
  initialFilters?: Partial<FiltersState>;
}

const defaultFilters: FiltersState = {
  priceRange: { min: 0, max: 20000 },
  distance: 5, // 5km default
  type: 'all',
  amenities: [],
  searchTerm: '',
};

export function Filters({ onFiltersChange, initialFilters }: FiltersProps) {
  const [filters, setFilters] = useState<FiltersState>({ ...defaultFilters, ...initialFilters });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: { min: value[0], max: value[1] } }));
  };

  const handleDistanceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, distance: value[0] }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value as AccommodationType | 'all' }));
  };

  const handleAmenityChange = (amenityId: Amenity, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter(a => a !== amenityId),
    }));
  };
  
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onFiltersChange(filters);
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };
  
  useEffect(() => {
    // Debounce filter changes or apply on submit
    const timer = setTimeout(() => {
      if(isMounted) handleSubmit();
    }, 500); // Apply filters after 500ms of inactivity
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isMounted]);


  if (!isMounted) {
    return <div className="p-6 bg-card rounded-lg shadow-lg space-y-6 animate-pulse">
      {[...Array(5)].map((_,i) => <div key={i} className="h-8 bg-muted rounded w-full mb-2"></div>)}
    </div>;
  }

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg space-y-6 sticky top-20 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-headline text-primary flex items-center">
          <ListFilter className="mr-2 h-5 w-5" /> Filter Options
        </h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
          <RotateCcw className="mr-1 h-3 w-3" /> Reset
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="searchTerm" className="mb-1 block font-semibold">Search by Name/Location</Label>
          <div className="relative">
            <Input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="e.g., Sunrise Hostel or University Ave"
              value={filters.searchTerm || ''}
              onChange={handleSearchTermChange}
              className="pl-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={['price', 'type']} className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger className="font-semibold text-left">
              <DollarSign className="mr-2 h-5 w-5 inline-block" /> Price Range (₹{filters.priceRange.min} - ₹{filters.priceRange.max})
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <Slider
                min={0}
                max={30000}
                step={500}
                value={[filters.priceRange.min, filters.priceRange.max]}
                onValueChange={handlePriceChange}
                aria-label="Price range slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₹0</span>
                <span>₹30,000+</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="distance">
            <AccordionTrigger className="font-semibold text-left">
              <Route className="mr-2 h-5 w-5 inline-block" /> Max Distance ({filters.distance} km from campus)
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <Slider
                min={0.1}
                max={10}
                step={0.1}
                value={[filters.distance]}
                onValueChange={handleDistanceChange}
                aria-label="Distance to campus slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.1 km</span>
                <span>10 km</span>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="type">
            <AccordionTrigger className="font-semibold text-left">Accommodation Type</AccordionTrigger>
            <AccordionContent>
              <Select value={filters.type} onValueChange={handleTypeChange}>
                <SelectTrigger aria-label="Select accommodation type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {accommodationTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="amenities">
            <AccordionTrigger className="font-semibold text-left">Amenities</AccordionTrigger>
            <AccordionContent className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {allAmenities.map(amenity => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity.id}`}
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)}
                    aria-label={amenity.label}
                  />
                  <Label htmlFor={`amenity-${amenity.id}`} className="font-normal text-sm cursor-pointer">
                    {amenity.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Apply filters button might be useful if debouncing is removed or for explicit action */}
        {/* <Button type="submit" className="w-full mt-4">
          <ListFilter className="mr-2 h-4 w-4" /> Apply Filters
        </Button> */}
      </form>
    </div>
  );
}
