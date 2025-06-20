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
  {
    id: '6',
    name: 'Green Meadows Hostel (Girls)',
    address: '55 Park Ave, College Town, CT 12349',
    collegeName: 'Arts College',
    distanceToCollege: 1.0,
    price: 9000,
    type: 'Hostel',
    amenities: ['wifi', 'laundry', 'mess_food', 'gym', 'ac', 'furnished', 'parking'],
    images: [
      'https://placehold.co/600x400.png?text=Hostel+Garden',
      'https://placehold.co/600x400.png?text=Dorm+Room',
      'https://placehold.co/600x400.png?text=Gym+Facility'
    ],
    description: 'A well-maintained hostel for girls with lush green surroundings. Offers both AC and Non-AC rooms with all modern facilities including a gym and parking.',
    contact: { name: 'Warden Green', phone: '555-1122' },
    rating: 4.6,
    reviewsCount: 150,
    availability: 'available',
    gender: 'female',
  },
  {
    id: '7',
    name: 'Techies Den PG (Boys)',
    address: '303 Silicon Alley, Tech Park, TP 54321',
    collegeName: 'Tech Institute',
    distanceToCollege: 0.2,
    price: 10000,
    type: 'PG',
    amenities: ['wifi', 'ac', 'mess_food', 'laundry', 'study_area', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Modern+PG+View',
      'https://placehold.co/600x400.png?text=Single+Room+Setup'
    ],
    description: 'Premium PG for boys, designed for Tech Institute students. High-speed internet, individual study desks, and tech-focused environment.',
    contact: { name: 'Mr. Byte', email: 'techden@example.com' },
    rating: 4.7,
    reviewsCount: 110,
    availability: 'available',
    gender: 'male',
    rules: ['No loud music after 11 PM', 'Guest policy: 2 hours max in common room'],
  },
  {
    id: '8',
    name: 'Riverside Retreat Apartments',
    address: '1 Riverside Drive, Scenic View, SV 67890',
    collegeName: 'Riverside University',
    distanceToCollege: 3.5,
    price: 12000,
    type: 'Apartment',
    amenities: ['wifi', 'kitchen', 'parking', 'gym', 'laundry'],
    images: [
      'https://placehold.co/600x400.png?text=Apartment+Balcony+View',
      'https://placehold.co/600x400.png?text=Modern+Kitchen'
    ],
    description: 'Beautiful 1-BHK apartments with river views. A bit of a commute, but offers a peaceful environment. Good for students who prefer quiet.',
    contact: { name: 'Riverside Rentals', phone: '555-9900' },
    rating: 4.3,
    reviewsCount: 70,
    availability: 'limited',
    gender: 'co-ed',
  },
  {
    id: '9',
    name: "Students' Haven Hostel",
    address: '99 Scholar Street, Erudite City, EC 11223',
    collegeName: 'Grand Library College',
    distanceToCollege: 0.7,
    price: 5500,
    type: 'Hostel',
    amenities: ['wifi', 'mess_food', 'study_area', 'laundry'],
    images: [
      'https://placehold.co/600x400.png?text=Hostel+Entrance',
      'https://placehold.co/600x400.png?text=Bunk+Beds'
    ],
    description: 'A no-frills, budget-friendly co-ed hostel. Focuses on essentials and a communal living experience. Close to the Grand Library College.',
    contact: { name: 'Manager Haven', phone: '555-3344' },
    rating: 3.9,
    reviewsCount: 60,
    availability: 'available',
    gender: 'co-ed',
  },
  {
    id: '10',
    name: 'Pinnacle PG (Luxury)',
    address: '1 Elite Towers, Uptown, UT 90210',
    collegeName: 'Prestige Business School',
    distanceToCollege: 1.5,
    price: 18000,
    type: 'PG',
    amenities: ['wifi', 'ac', 'furnished', 'laundry', 'gym', 'mess_food', 'study_area', 'parking'],
    images: [
      'https://placehold.co/600x400.png?text=Luxury+PG+Exterior',
      'https://placehold.co/600x400.png?text=Spacious+Room',
      'https://placehold.co/600x400.png?text=Rooftop+Lounge'
    ],
    description: 'Exclusive PG for discerning students of Prestige Business School. Top-tier amenities, single occupancy rooms, and gourmet meals.',
    contact: { name: 'Ms. Elegance', email: 'pinnaclepg@example.com' },
    rating: 4.9,
    reviewsCount: 95,
    availability: 'limited',
    gender: 'co-ed',
    rules: ['Valet parking available', 'Strict adherence to community guidelines'],
  },
   {
    id: '11',
    name: 'The Nook - Shared Rooms',
    address: '22B Baker Street, Metro City, MC 54321',
    collegeName: 'Metro City University',
    distanceToCollege: 2.0,
    price: 4500,
    type: 'Room',
    amenities: ['wifi', 'kitchen'],
    images: [
      'https://placehold.co/600x400.png?text=Shared+Living+Space',
      'https://placehold.co/600x400.png?text=Kitchenette'
    ],
    description: 'Basic shared rooms in an apartment setup. Ideal for students on a tight budget looking for a place near Metro City University.',
    contact: { name: 'Property Manager Nook', phone: '555-6789' },
    rating: 3.5,
    reviewsCount: 30,
    availability: 'available',
  },
  {
    id: '12',
    name: "Ladies' Wing Hostel",
    address: '7 Graceful Lane, Harmony Town, HT 67890',
    collegeName: "Women's College of Arts",
    distanceToCollege: 0.4,
    price: 7000,
    type: 'Hostel',
    amenities: ['wifi', 'laundry', 'mess_food', 'furnished', 'study_area'],
    images: [
      'https://placehold.co/600x400.png?text=Hostel+Facade',
      'https://placehold.co/600x400.png?text=Twin+Sharing+Room'
    ],
    description: "A dedicated and secure hostel for students of Women's College of Arts. Emphasis on safety and community.",
    contact: { name: 'Mrs. Davis', email: 'ladieswing@example.com' },
    rating: 4.4,
    reviewsCount: 115,
    availability: 'available',
    gender: 'female',
    rules: ['Gate closing time 9 PM', 'Only female visitors allowed in designated areas'],
  },
  {
    id: '13',
    name: 'Engineers Pad PG (Male)',
    address: '101 Innovation Drive, Tech Hub, TH 12321',
    collegeName: 'Engineering Institute of Tech',
    distanceToCollege: 0.1,
    price: 9500,
    type: 'PG',
    amenities: ['wifi', 'ac', 'mess_food', 'laundry', 'study_area'],
    images: [
      'https://placehold.co/600x400.png?text=Engineers+PG+Building',
      'https://placehold.co/600x400.png?text=Collaborative+Study+Area'
    ],
    description: 'PG facility right opposite the Engineering Institute. Catering specifically to male engineering students with late-night study facilities.',
    contact: { name: 'Mr. Gear', phone: '555-0101' },
    rating: 4.1,
    reviewsCount: 78,
    availability: 'full',
    gender: 'male',
  },
  {
    id: '14',
    name: 'Artisan Lofts (Apartments)',
    address: '5 Creative Corner, Downtown Arts District, AD 98765',
    collegeName: 'Fine Arts Academy',
    distanceToCollege: 1.8,
    price: 16000,
    type: 'Apartment',
    amenities: ['wifi', 'kitchen', 'furnished', 'parking'],
    images: [
      'https://placehold.co/600x400.png?text=Loft+Style+Apartment',
      'https://placehold.co/600x400.png?text=Art+Studio+Space'
    ],
    description: 'Stylish loft apartments in the arts district, suitable for students of the Fine Arts Academy. Spacious and inspiring environment.',
    contact: { name: 'Loft Management Co.', email: 'artisan@example.com' },
    rating: 4.7,
    reviewsCount: 55,
    availability: 'available',
    gender: 'co-ed',
  },
  {
    id: '15',
    name: 'Commuter Choice Rooms',
    address: '25 Transit Hub Road, Suburbia, SB 10001',
    collegeName: 'City College',
    distanceToCollege: 5.0,
    price: 3500,
    type: 'Room',
    amenities: ['furnished', 'parking'],
    images: [
      'https://placehold.co/600x400.png?text=Suburban+House+Room',
    ],
    description: 'Affordable rooms in a quiet suburban area with good transport links to City College. Ideal for students who don\t mind a commute.',
    contact: { name: 'Ms. Commuter', phone: '555-2020' },
    rating: 3.6,
    reviewsCount: 25,
    availability: 'limited',
  },
  {
    id: '16',
    name: 'Central Perk PG',
    address: 'Central Avenue 42, Downtown, DT 43210',
    collegeName: 'Central University',
    distanceToCollege: 0.9,
    price: 7200,
    type: 'PG',
    amenities: ['wifi', 'laundry', 'mess_food', 'furnished'],
    images: ['https://placehold.co/600x400.png?text=Cozy PG Room'],
    description: 'Friendly co-ed PG with a home-like atmosphere, close to Central University and downtown amenities.',
    contact: { name: 'Gunther Central', email: 'centralperkpg@example.com' },
    rating: 4.0,
    reviewsCount: 88,
    availability: 'available',
    gender: 'co-ed',
  },
  {
    id: '17',
    name: 'The Varsity House',
    address: '1 Victory Lane, Sports Complex, SC 20202',
    collegeName: 'State Sports University',
    distanceToCollege: 0.3,
    price: 8500,
    type: 'Hostel',
    amenities: ['wifi', 'laundry', 'mess_food', 'gym', 'ac', 'study_area'],
    images: [
      'https://placehold.co/600x400.png?text=Varsity Hostel Building',
      'https://placehold.co/600x400.png?text=Training Gym',
    ],
    description: 'Hostel for athletes and students of State Sports University. Facilities tailored for training and recovery.',
    contact: { name: 'Coach Powers', phone: '555-7777' },
    rating: 4.5,
    reviewsCount: 130,
    availability: 'available',
    gender: 'co-ed',
  },
  {
    id: '18',
    name: 'Eco Haven PG (Girls)',
    address: '15 Nature Walk, Green Valley, GV 30303',
    collegeName: 'Environmental Science College',
    distanceToCollege: 2.1,
    price: 6800,
    type: 'PG',
    amenities: ['wifi', 'kitchen', 'laundry', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Eco Friendly PG',
      'https://placehold.co/600x400.png?text=Room with Plants',
    ],
    description: 'A PG for girls with a focus on sustainability and nature, near Environmental Science College.',
    contact: { name: 'Ms. Flora Green', email: 'ecohaven@example.com' },
    rating: 4.2,
    reviewsCount: 65,
    availability: 'limited',
    gender: 'female',
  },
  {
    id: '19',
    name: 'Alpha Omega Apartments',
    address: 'Unit 1A, Fraternity Row, University Park, UP 60606',
    collegeName: 'State University',
    distanceToCollege: 1.1,
    price: 14000,
    type: 'Apartment',
    amenities: ['wifi', 'kitchen', 'parking', 'laundry', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Apartment Building Exterior',
      'https://placehold.co/600x400.png?text=Furnished Apartment Interior',
    ],
    description: 'Well-maintained 2-bedroom apartments popular among State University students. Close to campus life.',
    contact: { name: 'University Park Rentals', phone: '555-0011' },
    rating: 4.6,
    reviewsCount: 190,
    availability: 'available',
    gender: 'co-ed',
  },
  {
    id: '20',
    name: 'The Graduate Quarters',
    address: 'PhD Lane 7, Research Park, RP 70707',
    collegeName: 'Advanced Research Institute',
    distanceToCollege: 0.5,
    price: 11000,
    type: 'Room',
    amenities: ['wifi', 'kitchen', 'study_area', 'ac', 'furnished'],
    images: [
      'https://placehold.co/600x400.png?text=Graduate Housing Exterior',
      'https://placehold.co/600x400.png?text=Quiet Study Room',
    ],
    description: 'Single rooms in a quiet, studious environment, tailored for graduate students of the Advanced Research Institute.',
    contact: { name: 'Dr. Thesis Supervisor', email: 'gradquarters@example.com' },
    rating: 4.8,
    reviewsCount: 40,
    availability: 'limited',
    gender: 'co-ed',
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

// This is a placeholder for a real college address lookup
// In a real app, you'd use a geocoding API and potentially store college coords
const collegeCoordinatesDB: Record<string, { lat: number; lng: number }> = {
  "central university": { lat: 28.6139, lng: 77.2090 }, // Delhi
  "city college": { lat: 19.0760, lng: 72.8777 }, // Mumbai
  "tech institute": { lat: 12.9716, lng: 77.5946 }, // Bangalore
  "community college": { lat: 22.5726, lng: 88.3639 }, // Kolkata
  "arts college": { lat: 13.0827, lng: 80.2707 }, // Chennai
  "riverside university": { lat: 30.7333, lng: 76.7794 }, // Chandigarh (example)
  "grand library college": { lat: 17.3850, lng: 78.4867 }, // Hyderabad
  "prestige business school": { lat: 18.5204, lng: 73.8567 }, // Pune
  "metro city university": { lat: 28.5355, lng: 77.3910 }, // Noida (example for Metro City)
  "women's college of arts": { lat: 19.0176, lng: 72.8562 }, // Mumbai example
  "engineering institute of tech": { lat: 12.9279, lng: 77.6271 }, // Bangalore example
  "fine arts academy": { lat: 22.5448, lng: 88.3426 }, // Kolkata example
  "state sports university": {lat: 26.9124, lng: 75.7873 }, // Jaipur (example)
  "environmental science college": { lat: 9.9312, lng: 76.2673 }, // Kochi (example)
  "state university": { lat: 25.2744, lng: 82.9739 }, // Varanasi (example)
  "advanced research institute": { lat: 12.9716, lng: 77.5946 } // Bangalore (shared with Tech Institute for example)
};


export async function getCollegeCoordinates(collegeName?: string): Promise<{ lat: number; lng: number } | null> {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async
  if (!collegeName) return { lat: 20.5937, lng: 78.9629 }; // Default to India center if no college name
  
  const normalizedName = collegeName.toLowerCase();
  
  // Try direct match
  if (collegeCoordinatesDB[normalizedName]) {
    return collegeCoordinatesDB[normalizedName];
  }

  // Try partial match (e.g., "Central University" should match "central university")
  for (const key in collegeCoordinatesDB) {
    if (normalizedName.includes(key)) {
      return collegeCoordinatesDB[key];
    }
  }
  
  // Fallback if no specific match
  console.warn(`No specific coordinates found for ${collegeName}, returning default.`);
  return { lat: 20.5937, lng: 78.9629 }; // Default to India center
}
