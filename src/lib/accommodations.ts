
import type { Accommodation, Amenity, AccommodationType } from '@/types';

// Let's use more realistic mock UIDs
const MOCK_OWNER_UID_1 = 'mock-owner-uid-1';
const MOCK_OWNER_UID_2 = 'mock-owner-uid-2';


export let mockAccommodations: Accommodation[] = [
  {
    id: '1',
    ownerId: MOCK_OWNER_UID_1,
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
    ownerId: MOCK_OWNER_UID_2,
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
    ownerId: MOCK_OWNER_UID_1,
    name: 'Campus View Apartments',
    address: '789 College Rd, College Town, CT 12347',
    collegeName: 'Tech Institute',
    distanceToCollege: 0.8,
    price: 15000, 
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
    gender: 'co-ed',
  },
  {
    id: '4',
    ownerId: MOCK_OWNER_UID_2,
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
    ownerId: MOCK_OWNER_UID_1,
    name: 'The Study Nook PG (Co-ed)',
    address: '22 Academy St, College Town, CT 12345',
    collegeName: 'Central University',
    distanceToCollege: 0.3,
    price: 7500,
    type: 'PG',
    amenities: ['wifi', 'study_area', 'mess_food', 'laundry', 'ac'],
    images: [
      'https://placehold.co/600x400.png?text=PG+Front',
      'https://placehold.co/600x400.png?text=Study+Room'
    ],
    description: 'Co-ed PG focused on providing a quiet and conducive environment for studying. Close to Central University. AC rooms available.',
    contact: { name: 'The Study Nook Admin', email: 'studynook@example.com' },
    rating: 4.0,
    reviewsCount: 92,
    availability: 'limited',
    gender: 'co-ed',
    rules: ['Strictly no parties', 'Visitors allowed only in common areas until 8 PM'],
  },
  // ... other mock accommodations
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

// --- Mock CRUD Functions ---

export async function addAccommodation(newListing: Accommodation): Promise<Accommodation> {
    console.log("Adding new listing (mock):", newListing);
    await new Promise(resolve => setTimeout(resolve, 500));
    mockAccommodations.unshift(newListing); // Add to the start of the array
    return newListing;
}

export async function updateAccommodation(id: string, updatedData: Accommodation): Promise<Accommodation | undefined> {
    console.log("Updating listing (mock):", id, updatedData);
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockAccommodations.findIndex(acc => acc.id === id);
    if (index !== -1) {
        mockAccommodations[index] = { ...mockAccommodations[index], ...updatedData };
        return mockAccommodations[index];
    }
    throw new Error("Listing not found for update");
}

export async function deleteAccommodation(id: string): Promise<{ success: boolean }> {
    console.log("Deleting listing (mock):", id);
    await new Promise(resolve => setTimeout(resolve, 500));
    const initialLength = mockAccommodations.length;
    mockAccommodations = mockAccommodations.filter(acc => acc.id !== id);
    if (mockAccommodations.length < initialLength) {
        return { success: true };
    }
    throw new Error("Listing not found for deletion");
}


// --- Mock Getter Functions ---

export async function getAccommodationById(id: string): Promise<Accommodation | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockAccommodations.find(acc => acc.id === id);
}

export async function getAccommodationsByOwnerId(ownerId: string): Promise<Accommodation[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  // In a real app, this would be a database query.
  // We use a mock UID for demonstration.
  const targetOwnerId = ownerId.startsWith('mock-') ? ownerId : MOCK_OWNER_UID_1;
  return mockAccommodations.filter(acc => acc.ownerId === targetOwnerId);
}

export async function getAllAccommodations(filters?: any): Promise<Accommodation[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  let accommodations = mockAccommodations;

  if (filters) {
    // Filtering logic remains the same
    if (filters.priceRange && filters.priceRange.min !== undefined && filters.priceRange.max !== undefined) {
      accommodations = accommodations.filter(acc => acc.price >= filters.priceRange.min && acc.price <= filters.priceRange.max);
    }
    if (filters.distance && filters.distance > 0) {
      accommodations = accommodations.filter(acc => acc.distanceToCollege !== undefined && acc.distanceToCollege <= filters.distance);
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


const collegeCoordinatesDB: Record<string, { lat: number; lng: number }> = {
  "central university": { lat: 28.6139, lng: 77.2090 },
  "city college": { lat: 19.0760, lng: 72.8777 },
  "tech institute": { lat: 12.9716, lng: 77.5946 },
};

export async function getCollegeCoordinates(collegeName?: string): Promise<{ lat: number; lng: number } | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  if (!collegeName) return { lat: 20.5937, lng: 78.9629 };
  
  const normalizedName = collegeName.toLowerCase();
  if (collegeCoordinatesDB[normalizedName]) {
    return collegeCoordinatesDB[normalizedName];
  }
  for (const key in collegeCoordinatesDB) {
    if (normalizedName.includes(key)) {
      return collegeCoordinatesDB[key];
    }
  }
  return { lat: 20.5937, lng: 78.9629 };
}
