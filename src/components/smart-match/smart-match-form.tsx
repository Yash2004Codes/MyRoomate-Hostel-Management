'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { allAmenities } from '@/lib/accommodations';
import type { Amenity } from '@/types';
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import type { SmartMatchInput } from '@/ai/flows/smart-match';

interface SmartMatchFormProps {
  onSubmit: (values: SmartMatchInput) => Promise<void>;
  loading: boolean;
}

const formSchema = z.object({
  budget: z.coerce.number().min(1000, { message: 'Budget must be at least ₹1000.' }).max(50000, { message: 'Budget cannot exceed ₹50,000.' }),
  amenitiesPreferences: z.array(z.string()).min(1, { message: 'Please select at least one amenity.' }),
  reviews: z.string().optional().describe('Optional: Enter any specific keywords or sentiments from reviews you value (e.g., "quiet study environment", "good food", "poor maintenance").'),
});

export function SmartMatchForm({ onSubmit, loading }: SmartMatchFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 5000,
      amenitiesPreferences: [],
      reviews: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const apiInput: SmartMatchInput = {
      budget: values.budget,
      amenitiesPreferences: values.amenitiesPreferences.join(', '),
      reviews: values.reviews || '',
    };
    onSubmit(apiInput);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Your Monthly Budget (₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 7500" {...field} className="text-base" />
              </FormControl>
              <FormDescription>
                Enter the maximum amount you&apos;re willing to spend per month.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenitiesPreferences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-lg">Preferred Amenities</FormLabel
                ><FormDescription>Select the amenities that are most important to you.</FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allAmenities.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="amenitiesPreferences"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0 p-3 border rounded-lg bg-muted/20 hover:bg-muted/50 transition-colors"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item.id])
                                : field.onChange(
                                    (field.value || []).filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reviews"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Review Keywords (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., quiet, good food, friendly warden, clean rooms..."
                  className="resize-none text-base"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Any specific aspects from reviews you care about? (e.g., &quot;cleanliness&quot;, &quot;good Wi-Fi&quot;).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          Find My Smart Match
        </Button>
      </form>
    </Form>
  );
}
