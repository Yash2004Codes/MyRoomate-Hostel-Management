export type Amenity = 
  | "wifi" 
  | "laundry" 
  | "parking" 
  | "kitchen" 
  | "ac" 
  | "furnished" 
  | "gym"
  | "study_area"
  | "mess_food";

export type AccommodationType = "PG" | "Hostel" | "Apartment" | "Room";

export interface Accommodation {
  id: string;
  ownerId?: string; // To link accommodation to a user
  name: string;
  address: string;
  collegeName?: string; // For map centering and relevance
  distanceToCollege?: number; // in km
  price: number; // per month
  type: AccommodationType;
  amenities: Amenity[];
  images: string[]; // URLs to images
  description: string;
  contact: {
    name: string;
    phone?: string;
    email?: string;
  };
  rating?: number; // 1-5 stars
  reviewsCount?: number;
  availability: "available" | "limited" | "full";
  gender?: "male" | "female" | "co-ed"; // For PGs/Hostels
  rules?: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}
