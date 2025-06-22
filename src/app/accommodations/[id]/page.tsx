import { getAccommodationById, getCollegeCoordinates } from '@/lib/accommodations';
import { Header } from '@/components/common/header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Amenity } from '@/types';
import { AlertTriangle, BedDouble, BookOpen, Car, CheckCircle, DollarSign, Dumbbell, Home, Info, LocateFixed, Mail, Phone, ShieldCheck, Shirt, Star, Thermometer, Utensils, Users, Wifi, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MapView } from '@/components/accommodations/map-view'; // Assuming MapView can take a single accommodation
import { ContactOwnerForm } from '@/components/accommodations/contact-owner-form';

interface AccommodationPageProps {
  params: { id: string };
}

const AmenityDisplay = ({ amenity, label }: { amenity: Amenity | string; label: string }) => {
  const iconProps = { className: "w-5 h-5 mr-2 text-primary" };
  let icon;
  switch (amenity) {
    case 'wifi': icon = <Wifi {...iconProps} />; break;
    case 'laundry': icon = <Shirt {...iconProps} />; break;
    case 'parking': icon = <Car {...iconProps} />; break;
    case 'kitchen': icon = <Utensils {...iconProps} />; break;
    case 'ac': icon = <Thermometer {...iconProps} />; break;
    case 'furnished': icon = <BedDouble {...iconProps} />; break;
    case 'gym': icon = <Dumbbell {...iconProps} />; break;
    case 'study_area': icon = <BookOpen {...iconProps} />; break;
    case 'mess_food': icon = <Utensils {...iconProps} />; break; // Re-using Utensils
    default: icon = <CheckCircle {...iconProps} />; break;
  }
  return (
    <div className="flex items-center p-2 bg-secondary/30 rounded-md">
      {icon}
      <span className="text-sm capitalize">{label.replace('_', ' ')}</span>
    </div>
  );
};

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const accommodation = await getAccommodationById(params.id);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


  if (!accommodation) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertTriangle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl font-headline mb-4">Accommodation Not Found</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Sorry, we couldn&apos;t find the accommodation you were looking for.
          </p>
          <Button asChild>
            <Link href="/search">Back to Search</Link>
          </Button>
        </div>
      </>
    );
  }
  
  const collegeLocation = accommodation.collegeName ? await getCollegeCoordinates(accommodation.collegeName) : null;

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden shadow-2xl">
          <CardHeader className="p-0 relative">
            {/* Image Carousel (Simplified to one image for now) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-h-[500px] overflow-hidden">
              <Image
                src={accommodation.images[0] || 'https://placehold.co/800x500.png?text=Accommodation+View'}
                alt={`Main image of ${accommodation.name}`}
                width={800}
                height={500}
                className="w-full h-auto md:h-[500px] object-cover col-span-1 md:col-span-1"
                priority
                data-ai-hint="room interior"
              />
              <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-1">
                {accommodation.images.slice(1,5).map((img, idx) => (
                   <Image
                    key={idx}
                    src={img || `https://placehold.co/400x250.png?text=View+${idx+1}`}
                    alt={`View ${idx+1} of ${accommodation.name}`}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                    data-ai-hint="amenity photo"
                  />
                ))}
                 {accommodation.images.length < 2 && <div className="bg-muted flex items-center justify-center"><Home className="w-12 h-12 text-border"/></div> }
                 {accommodation.images.length < 3 && <div className="bg-muted flex items-center justify-center"><Home className="w-12 h-12 text-border"/></div> }
                 {accommodation.images.length < 4 && <div className="bg-muted flex items-center justify-center"><Home className="w-12 h-12 text-border"/></div> }
                 {accommodation.images.length < 5 && <div className="bg-muted flex items-center justify-center"><Home className="w-12 h-12 text-border"/></div> }
              </div>
            </div>
             <Badge className="absolute top-4 left-4 text-lg px-3 py-1 bg-primary text-primary-foreground shadow-md">{accommodation.type}</Badge>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="md:col-span-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <CardTitle className="text-3xl md:text-4xl font-headline text-primary mb-2 sm:mb-0">{accommodation.name}</CardTitle>
                  {accommodation.rating && (
                    <div className="flex items-center text-amber-500 text-lg">
                      <Star className="h-6 w-6 mr-1 fill-amber-400" /> 
                      {accommodation.rating.toFixed(1)} 
                      <span className="text-sm text-muted-foreground ml-1">({accommodation.reviewsCount || 0} reviews)</span>
                    </div>
                  )}
                </div>
                <CardDescription className="text-md text-muted-foreground mb-2 flex items-center">
                  <LocateFixed className="h-5 w-5 mr-2 text-primary/80" /> {accommodation.address}
                </CardDescription>
                {accommodation.distanceToCollege && (
                  <p className="text-sm text-foreground/80 mb-4">
                    Approximately <strong>{accommodation.distanceToCollege} km</strong> from {accommodation.collegeName || 'campus'}.
                  </p>
                )}

                <Separator className="my-6" />

                <h3 className="text-2xl font-headline font-semibold mb-3 text-primary-foreground bg-primary/80 py-1 px-3 inline-block rounded">Description</h3>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line mb-6">{accommodation.description}</p>

                <h3 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground bg-primary/80 py-1 px-3 inline-block rounded">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {accommodation.amenities.map(amenity => (
                    <AmenityDisplay key={amenity} amenity={amenity} label={amenity} />
                  ))}
                </div>
                
                {accommodation.rules && accommodation.rules.length > 0 && (
                  <>
                    <h3 className="text-2xl font-headline font-semibold mb-3 text-primary-foreground bg-primary/80 py-1 px-3 inline-block rounded">House Rules</h3>
                    <ul className="list-disc list-inside space-y-1 text-foreground/90 mb-6 pl-4">
                      {accommodation.rules.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </>
                )}
                
              </div>

              {/* Sidebar Column */}
              <div className="md:col-span-1 space-y-6">
                <Card className="shadow-lg bg-primary/5 border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-headline text-primary flex items-center">
                      <DollarSign className="mr-2 h-6 w-6" /> Pricing & Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-3xl font-semibold text-foreground">
                      ₹{accommodation.price.toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">/month</span>
                    </p>
                    <div className={`flex items-center p-2 rounded-md text-sm font-medium ${
                      accommodation.availability === 'available' ? 'bg-green-100 text-green-700' :
                      accommodation.availability === 'limited' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {accommodation.availability === 'available' ? <CheckCircle className="mr-2 h-5 w-5"/> : 
                       accommodation.availability === 'limited' ? <Info className="mr-2 h-5 w-5"/> : 
                       <XCircle className="mr-2 h-5 w-5"/>}
                      Status: <span className="ml-1 capitalize font-bold">{accommodation.availability}</span>
                    </div>
                    {(accommodation.type === "PG" || accommodation.type === "Hostel") && accommodation.gender && (
                       <Badge variant="outline" className="capitalize text-sm p-2 w-full justify-center">
                        <Users className="h-4 w-4 mr-2" /> For {accommodation.gender} students
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" disabled={accommodation.availability === 'full'}>
                      {accommodation.availability === 'full' ? "Currently Full" : "Inquire Now / Book"}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-headline text-primary flex items-center">
                      <ShieldCheck className="mr-2 h-5 w-5" /> Owner Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {accommodation.contact.name}</p>
                    {accommodation.contact.phone && (
                      <p className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" /> 
                        <a href={`tel:${accommodation.contact.phone}`} className="text-primary hover:underline">{accommodation.contact.phone}</a>
                      </p>
                    )}
                    {accommodation.contact.email && (
                      <p className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${accommodation.contact.email}`} className="text-primary hover:underline">{accommodation.contact.email}</a>
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                <ContactOwnerForm ownerName={accommodation.contact.name} accommodationName={accommodation.name} />

              </div>
            </div>
            
            {/* Map Section */}
            <Separator className="my-8" />
            <h3 className="text-2xl font-headline font-semibold mb-4 text-primary-foreground bg-primary/80 py-1 px-3 inline-block rounded">Location Map</h3>
             <div className="h-[400px] w-full rounded-lg overflow-hidden border">
              <MapView 
                accommodations={collegeLocation ? [accommodation] : []} // Pass only current if college known, or handle differently
                collegeLocation={collegeLocation} 
                apiKey={googleMapsApiKey} 
              />
            </div>

          </CardContent>
        </Card>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-8">
        © {new Date().getFullYear()} CollegeRooms. Your Home Away From Home.
      </footer>
    </div>
  );
}
