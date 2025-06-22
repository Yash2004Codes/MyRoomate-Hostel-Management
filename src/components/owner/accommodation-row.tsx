'use client';

import { Accommodation } from '@/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface AccommodationRowProps {
  accommodation: Accommodation;
}

export function AccommodationRow({ accommodation }: AccommodationRowProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-700 hover:bg-green-200',
    limited: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    full: 'bg-red-100 text-red-700 hover:bg-red-200',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Image
        src={accommodation.images[0] || 'https://placehold.co/150x100.png'}
        alt={accommodation.name}
        width={150}
        height={100}
        className="rounded-md object-cover w-full sm:w-[150px] h-[100px]"
        data-ai-hint="building exterior"
      />
      <div className="flex-grow w-full">
        <div className="flex items-start justify-between">
            <h3 className="text-lg font-bold font-headline">{accommodation.name}</h3>
            <Badge className={`capitalize shrink-0 ${statusColors[accommodation.availability]}`}>
                {accommodation.availability}
            </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{accommodation.address}</p>
        <div className="flex items-center text-primary font-semibold mt-1">
            <DollarSign className="h-4 w-4 mr-1" /> {accommodation.price.toLocaleString()}/month
        </div>
      </div>
      <div className="flex gap-2 self-center sm:self-center mt-4 sm:mt-0">
        <Button variant="outline" size="icon" asChild>
            <Link href={`/accommodations/${accommodation.id}`} aria-label="View Listing">
                <Eye className="h-4 w-4" />
                <span className="sr-only">View</span>
            </Link>
        </Button>
        <Button variant="outline" size="icon" aria-label="Edit Listing">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
        </Button>
        <Button variant="destructive" size="icon" aria-label="Delete Listing">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  );
}
