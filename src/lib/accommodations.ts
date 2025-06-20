import type { Accommodation, Amenity, AccommodationType } from '@/types';

export const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: 'Sunrise Premium Hostel',
    address: '123 University Ave, College Town, CT 12345',
    collegeName: 'Central University',
    distanceToCollege: 0.5,
    price: 8000,
    type: 'Hostel',
    amenities: ['wifi', 'laundry', 'mess_food', 'study_area', 'ac'],
    images: [
      'https://placehold.co/600x400.png?text=Hostel+Exterior',
      'https://placehold.co/600x400.png?text=Room+Interior',
      'https://placehold.co/600x400.png?text=Common+Area',
    ],
    description: 'A modern and comfortable hostel for male students, located right next to Central University. Includes three meals a day and high-speed internet.',
    contact: { name: 'Mr. John Doe', phone: '555-1234', email: 'sunrisehostel@example.com' },
    rating: 4.5,
    reviewsCount: 120,
    availability: 'available',
    gender: 'male',
    rules: ['No smoking indoors', 'Quiet hours after 10 PM'],
  },
  {
    id: '2',
    name: 'Scholars PG for Girls',
    address: '45 Main Street, College Town, CT 12346',
    collegeName: 'City College',
    distanceToCollege: 1.2,
    price: 6500,
    type: 'PG',
    amenities: ['wifi', 'furnished', 'kitchen', 'laundry'],
    images: [
      'https://placehold.co/600x400.png?text=PG+Building',
      'https://placehold.co/600x400.png?text=Shared+Room',
    ],
    description: 'Secure and friendly paying guest accommodation for female students. Shared rooms with attached bath and access to a common kitchen.',
    contact: { name: 'Ms. Jane Smith', email: 'scholars.pg@example.com' },
    rating: 4.2,
    reviewsCount: 85,
    availability: 'limited',
    gender: 'female',
  },
  {
    id: '3',
    name: 'Campus View Apartments',
    address: '789 College Rd, College Town, CT 12347',
    collegeName: 'Tech Institute',
    distanceToCollege: 0.8,
    price: 15000, // Assuming per apartment, could be shared
    type: 'Apartment',
    amenities: ['wifi', 'kitchen', 'parking', 'furnished', 'ac', 'gym'],
    images: [
      'https://placehold.co/600x400.png?text=Apartment+Complex',
      'https://placehold.co/600x400.png?text=Living+Room',
      'https://placehold.co/600x400.png?text=Bedroom',
    ],
    description: 'Spacious 2-BHK apartments ideal for students looking to share. Modern amenities and close proximity to Tech Institute.',
    contact: { name: 'Campus View Management', phone: '555-5678' },
    rating: 4.8,
    reviewsCount: 200,
    availability: 'available',
    gender: 'co-ed', // Apartments are generally co-ed unless specified
  },
  {
    id: '4',
    name: 'Budget Friendly Rooms',
    address: '10 Old Mill Lane, College Town, CT 12348',
    collegeName: 'Community College',
    distanceToCollege: 2.5,
    price: 4000,
    type: 'Room',
    amenities: ['wifi', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Room+Exterior',
    ],
    description: 'Affordable single rooms in a shared house. Basic amenities provided. A bit further from campus but well-connected by bus.',
    contact: { name: 'Mr. Alex Brown', phone: '555-8765' },
    rating: 3.8,
    reviewsCount: 45,
    availability: 'available',
  },
  {
    id: '5',
    name: 'The Study Nook PG',
    address: '22 Academy St, College Town, CT 12345',
    collegeName: 'Central University',
    distanceToCollege: 0.3,
    price: 7500,
    type: 'PG',
    amenities: ['wifi', 'study_area', 'mess_food', 'laundry'],
    images: [
      'https://placehold.co/600x400.png?text=PG+Front',
      'https://placehold.co/600x400.png?text=Study+Room'
    ],
    description: 'Co-ed PG focused on providing a quiet and conducive environment for studying. Close to Central University.',
    contact: { name: 'The Study Nook Admin', email: 'studynook@example.com' },
    rating: 4.0,
    reviewsCount: 92,
    availability: 'limited',
    gender: 'co-ed',
  },
  {
    id: '6',
    name: 'Green Meadows Hostel',
    address: '55 Park Ave, College Town, CT 12349',
    collegeName: 'Arts College',
    distanceToCollege: 1.0,
    price: 9000,
    type: 'Hostel',
    amenities: ['wifi', 'laundry', 'mess_food', 'gym', 'ac', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Hostel+Garden',
      'https://placehold.co/600x400.png?text=Dorm+Room'
    ],
    description: 'A well-maintained hostel with lush green surroundings. Offers both AC and Non-AC rooms with all modern facilities.',
    contact: { name: 'Warden Green', phone: '555-1122' },
    rating: 4.6,
    reviewsCount: 150,
    availability: 'available',
    gender: 'female',
  }
];

export const allAmenities: { id: Amenity; label: string; icon?: any }[] = [
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'laundry', label: 'Laundry' },
  { id: 'parking', label: 'Parking' },
  { id: 'kitchen', label: 'Kitchen Access' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'furnished', label: 'Furnished' },
  { id: 'gym', label: 'Gym' },
  { id: 'study_area', label: 'Study Area' },
  { id: 'mess_food', label: 'Mess/Food Included' },
];

export const accommodationTypes: AccommodationType[] = ["PG", "Hostel", "Apartment", "Room"];

export async function getAccommodationById(id: string): Promise<Accommodation | undefined> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockAccommodations.find(acc => acc.id === id);
}

export async function getAllAccommodations(filters?: any): Promise<Accommodation[]> {
  // Simulate API call & filtering
  await new Promise(resolve => setTimeout(resolve, 300));
  let accommodations = mockAccommodations;

  if (filters) {
    if (filters.priceRange && filters.priceRange.min && filters.priceRange.max) {
      accommodations = accommodations.filter(acc => acc.price >= filters.priceRange.min && acc.price <= filters.priceRange.max);
    }
    if (filters.distance && filters.distance > 0) {
      accommodations = accommodations.filter(acc => acc.distanceToCollege && acc.distanceToCollege <= filters.distance);
    }
    if (filters.type && filters.type !== "all") {
      accommodations = accommodations.filter(acc => acc.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.amenities && filters.amenities.length > 0) {
      accommodations = accommodations.filter(acc => filters.amenities.every((am: Amenity) => acc.amenities.includes(am)));
    }
     if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      accommodations = accommodations.filter(acc => 
        acc.name.toLowerCase().includes(searchTermLower) ||
        acc.address.toLowerCase().includes(searchTermLower) ||
        (acc.collegeName && acc.collegeName.toLowerCase().includes(searchTermLower))
      );
    }
  }
  return accommodations;
}

// This is a placeholder for a real college address lookup
export async function getCollegeCoordinates(collegeName?: string): Promise<{ lat: number; lng: number } | null> {
  if (!collegeName) return null;
  // In a real app, you'd use a geocoding API
  // For mock, let's return a fixed coordinate if it's a known college
  if (collegeName.toLowerCase().includes("central university")) {
    return { lat: 34.0522, lng: -118.2437 }; // Example: Los Angeles
  }
  return { lat: 34.0522, lng: -118.2437 }; // Default fallback
}
