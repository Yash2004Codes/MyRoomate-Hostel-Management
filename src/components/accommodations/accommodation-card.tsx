import type { Accommodation } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, LocateFixed, DollarSign, Star, Users, Wifi, Utensils, Car, Shirt, Thermometer, Dumbbell, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AccommodationCardProps {
  accommodation: Accommodation;
}

const AmenityIcon = ({ amenity }: { amenity: string }) => {
  const iconProps = { className: "w-4 h-4 mr-1" };
  switch (amenity) {
    case 'wifi': return <Wifi {...iconProps} />;
    case 'kitchen': return <Utensils {...iconProps} />;
    case 'parking': return <Car {...iconProps} />;
    case 'laundry': return <Shirt {...iconProps} />;
    case 'ac': return <Thermometer {...iconProps} />; // Lucide doesn't have a direct AC icon, using Thermometer
    case 'furnished': return <BedDouble {...iconProps} />; // Using BedDouble for furnished
    case 'gym': return <Dumbbell {...iconProps} />;
    case 'study_area': return <BookOpen {...iconProps} />;
    case 'mess_food': return <Utensils {...iconProps} />; // Re-using Utensils for mess food
    default: return null;
  }
};


export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const { id, name, images, price, type, address, distanceToCollege, amenities, rating, availability, gender } = accommodation;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full animate-slide-in-up">
      <CardHeader className="p-0 relative">
        <Link href={`/accommodations/${id}`} aria-label={`View details for ${name}`}>
          <Image
            src={images[0] || 'https://placehold.co/600x400.png?text=Accommodation'}
            alt={`Image of ${name}`}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="accommodation building"
          />
        </Link>
        {availability === 'limited' && <Badge variant="destructive" className="absolute top-2 right-2">Limited!</Badge>}
        {availability === 'full' && <Badge variant="secondary" className="absolute top-2 right-2">Full</Badge>}
         <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">{type}</Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/accommodations/${id}`}>
          <CardTitle className="text-xl font-headline mb-1 hover:text-primary transition-colors">{name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 truncate" title={address}>
          <LocateFixed className="inline-block h-3.5 w-3.5 mr-1 mb-0.5" /> {address}
        </CardDescription>
        
        <div className="flex items-center justify-between mb-2 text-sm">
           <div className="flex items-center text-primary font-semibold">
            <DollarSign className="h-4 w-4 mr-1" /> Rs. {price.toLocaleString()}/month
          </div>
          {rating && (
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 mr-1 fill-amber-400" /> {rating.toFixed(1)}
            </div>
          )}
        </div>

        {distanceToCollege && (
          <p className="text-xs text-muted-foreground mb-1">
            {distanceToCollege} km from {accommodation.collegeName || 'campus'}
          </p>
        )}
        {gender && (type === "PG" || type === "Hostel") && (
          <Badge variant="outline" className="capitalize text-xs mb-2">
            <Users className="h-3 w-3 mr-1" /> For {gender}
          </Badge>
        )}

        <div className="mt-2">
          <h4 className="text-xs font-semibold mb-1 text-foreground/80">Key Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs capitalize py-0.5 px-1.5">
                <AmenityIcon amenity={amenity} /> {amenity.replace('_', ' ')}
              </Badge>
            ))}
            {amenities.length > 3 && <Badge variant="secondary" className="text-xs py-0.5 px-1.5">+{amenities.length - 3} more</Badge>}
          </div>
        </div>

      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full" variant={availability === "full" ? "secondary" : "default"} disabled={availability === "full"}>
          <Link href={`/accommodations/${id}`}>
            {availability === "full" ? "View Details (Full)" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
