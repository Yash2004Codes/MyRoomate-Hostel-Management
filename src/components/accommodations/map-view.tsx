'use client';

import React, { useEffect, useState } from 'react';
import type { Accommodation } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
// import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps'; // Uncomment when API key is available

interface MapViewProps {
  accommodations: Accommodation[];
  collegeLocation?: { lat: number; lng: number } | null;
  apiKey?: string; // Google Maps API Key
}

export function MapView({ accommodations, collegeLocation, apiKey }: MapViewProps) {
  // const [selectedMarker, setSelectedMarker] = useState<Accommodation | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="w-full h-[500px] shadow-lg animate-pulse">
        <CardHeader>
          <CardTitle className="text-primary">Loading Map...</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <MapPin className="h-16 w-16 text-muted animate-bounce" />
        </CardContent>
      </Card>
    );
  }

  if (!apiKey) {
    return (
      <Card className="w-full h-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" /> Map Disabled
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full text-center">
          <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Interactive map is currently unavailable.
            <br />
            A Google Maps API key is required for this feature.
          </p>
          <Image 
            src="https://placehold.co/800x500.png?text=Map+Placeholder" 
            alt="Map placeholder" 
            width={800} 
            height={500} 
            className="mt-4 rounded-md opacity-50"
            data-ai-hint="map placeholder"
          />
        </CardContent>
      </Card>
    );
  }

  // Actual map implementation (to be uncommented and completed when API key is available)
  /*
  const defaultCenter = collegeLocation || { lat: 20.5937, lng: 78.9629 }; // India center as fallback

  return (
    <APIProvider apiKey={apiKey}>
      <Card className="w-full h-[500px] shadow-lg overflow-hidden">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={collegeLocation ? 13 : 5}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="college_rooms_map" // Optional: For custom map styling in Google Cloud Console
        >
          {collegeLocation && (
            <Marker
              position={collegeLocation}
              // icon={{ url: '/path/to/college-icon.png', scaledSize: new google.maps.Size(40,40)}} // Custom icon for college
              title="College Campus"
            />
          )}
          {accommodations.map((acc) => (
            <Marker
              key={acc.id}
              // position={ { lat: SOME_LAT, lng: SOME_LNG } } // Needs geocoding for acc.address
              title={acc.name}
              onClick={() => setSelectedMarker(acc)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              // position={ { lat: SOME_LAT, lng: SOME_LNG } } // Needs geocoding for selectedMarker.address
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h4 className="font-bold">{selectedMarker.name}</h4>
                <p>Price: ₹{selectedMarker.price}/month</p>
                <p>Type: {selectedMarker.type}</p>
                <Button size="sm" className="mt-2" asChild>
                  <Link href={`/accommodations/${selectedMarker.id}`}>View Details</Link>
                </Button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </Card>
    </APIProvider>
  );
  */

  // Fallback to placeholder if API key is present but logic is commented out
   return (
      <Card className="w-full h-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-primary">Interactive Map</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full text-center">
          <MapPin className="h-16 w-16 text-primary mb-4" />
          <p className="text-muted-foreground">
            Map view will display accommodations here.
          </p>
           <Image 
            src="https://placehold.co/800x500.png?text=Map+View+Active" 
            alt="Map placeholder" 
            width={800} 
            height={500} 
            className="mt-4 rounded-md"
            data-ai-hint="map navigation"
          />
        </CardContent>
      </Card>
    );
}
