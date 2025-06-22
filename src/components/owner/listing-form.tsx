
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Save, PlusCircle, Upload, X, FileVideo } from "lucide-react";
import React from "react";
import type { Accommodation, Amenity, AccommodationType } from "@/types";
import { allAmenities, accommodationTypes } from "@/lib/accommodations";
import Image from "next/image";
import { Label } from "@/components/ui/label";

interface ListingFormProps {
    initialData?: Accommodation | null;
    onSubmit: (data: Omit<Accommodation, 'id' | 'ownerId'>) => Promise<void>;
    isSubmitting: boolean;
}

const formSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
  address: z.string().min(10, { message: "Please enter a full address." }),
  collegeName: z.string().optional(),
  distanceToCollege: z.coerce.number().min(0, "Distance can't be negative.").optional(),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0." }),
  type: z.enum(accommodationTypes, { required_error: "You must select an accommodation type." }),
  amenities: z.array(z.string()).min(1, "Select at least one amenity."),
  description: z.string().min(20, "Description must be at least 20 characters.").max(1000),
  contact: z.object({
    name: z.string().min(2, "Enter a contact person's name."),
    phone: z.string().optional(),
    email: z.string().email("Enter a valid email.").optional(),
  }),
  availability: z.enum(["available", "limited", "full"]),
  gender: z.enum(["male", "female", "co-ed"]).optional(),
  rules: z.string().optional(),
  images: z.array(z.string()).min(1, "Please upload at least one image."),
});

type ListingFormValues = z.infer<typeof formSchema>;

export function ListingForm({ initialData, onSubmit, isSubmitting }: ListingFormProps) {
  const formMode = initialData ? 'edit' : 'create';

  const defaultValues: ListingFormValues = {
    name: initialData?.name || "",
    address: initialData?.address || "",
    collegeName: initialData?.collegeName || "",
    distanceToCollege: initialData?.distanceToCollege || 0,
    price: initialData?.price || 0,
    type: initialData?.type || "PG",
    amenities: initialData?.amenities || [],
    description: initialData?.description || "",
    contact: {
      name: initialData?.contact.name || "",
      phone: initialData?.contact.phone || "",
      email: initialData?.contact.email || "",
    },
    availability: initialData?.availability || "available",
    gender: initialData?.gender || "co-ed",
    rules: (initialData?.rules || []).join(', '),
    images: initialData?.images || [],
  };

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string[]) => void,
    currentValue: string[] = []
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFilePromises = Array.from(files).map(file => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    });

    try {
        const newFileResults = await Promise.all(newFilePromises);
        onChange([...currentValue, ...newFileResults]);
    } catch (error) {
        console.error("Error reading files:", error);
        // You could add a toast notification here for the user
    }
  };

  const handleRemoveImage = (
      index: number,
      onChange: (value: string[]) => void,
      currentValue: string[] = []
  ) => {
      const newValue = currentValue.filter((_, i) => i !== index);
      onChange(newValue);
  };

  const handleFormSubmit = (values: ListingFormValues) => {
    const submissionData = {
        ...values,
        rules: values.rules ? values.rules.split(',').map(r => r.trim()).filter(r => r) : [],
    };
    onSubmit(submissionData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the main details about your property.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Listing Title</FormLabel><FormControl><Input placeholder="e.g., Sunrise Premium Hostel" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Full Address</FormLabel><FormControl><Input placeholder="123 University Ave, College Town" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="type" render={({ field }) => (
                        <FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select accommodation type" /></SelectTrigger></FormControl><SelectContent>{accommodationTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem><FormLabel>Price (per month, in ₹)</FormLabel><FormControl><Input type="number" placeholder="8000" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="collegeName" render={({ field }) => (
                        <FormItem><FormLabel>Nearest College (Optional)</FormLabel><FormControl><Input placeholder="e.g., Central University" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="distanceToCollege" render={({ field }) => (
                        <FormItem><FormLabel>Distance to College (km, Optional)</FormLabel><FormControl><Input type="number" step="0.1" placeholder="0.5" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
                 <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Describe what makes your place great for students..." {...field} rows={5}/></FormControl><FormMessage /></FormItem>
                )}/>
            </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Photos & Videos</CardTitle>
            <CardDescription>Upload at least one photo. The first photo will be the main cover image.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor="file-upload" className="cursor-pointer w-full">
                        <div className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg text-muted-foreground hover:bg-muted/50 hover:border-primary transition-colors">
                          <Upload className="w-6 h-6 mr-2" />
                          <span>Click to upload media</span>
                        </div>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        onChange={(e) => handleFileChange(e, field.onChange, field.value)}
                        className="hidden"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                  {field.value && field.value.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {field.value.map((src, index) => (
                        <div key={index} className="relative group aspect-video">
                          {src.startsWith('data:image') ? (
                            <Image src={src} alt={`Preview ${index + 1}`} layout="fill" objectFit="cover" className="rounded-md" />
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full bg-muted rounded-md p-2">
                              <FileVideo className="w-8 h-8 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground mt-1 text-center" >Video Preview</span>
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index, field.onChange, field.value)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Amenities</CardTitle><CardDescription>Select all amenities that your property offers.</CardDescription></CardHeader>
            <CardContent>
                <FormField control={form.control} name="amenities" render={() => (
                    <FormItem>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {allAmenities.map((item) => (<FormField key={item.id} control={form.control} name="amenities" render={({ field }) => {
                                return (<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 p-3 border rounded-lg bg-muted/20 hover:bg-muted/50 transition-colors">
                                    <FormControl><Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                        return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id))
                                    }}/></FormControl>
                                    <FormLabel className="font-normal text-sm cursor-pointer">{item.label}</FormLabel>
                                </FormItem>);
                            }} />))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Configuration & Rules</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="availability" render={({ field }) => (
                        <FormItem><FormLabel>Availability Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="available">Available</SelectItem><SelectItem value="limited">Limited Spots</SelectItem><SelectItem value="full">Full</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem><FormLabel>Gender (for PG/Hostel)</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender restriction" /></SelectTrigger></FormControl><SelectContent><SelectItem value="co-ed">Co-ed</SelectItem><SelectItem value="male">Male Only</SelectItem><SelectItem value="female">Female Only</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )}/>
                 </div>
                 <FormField control={form.control} name="rules" render={({ field }) => (
                    <FormItem><FormLabel>House Rules (Optional)</FormLabel><FormControl><Textarea placeholder="e.g., No smoking, Quiet hours after 10 PM" {...field} /></FormControl><FormDescription>Enter rules separated by a comma.</FormDescription><FormMessage /></FormItem>
                )}/>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader><CardTitle>Contact Person</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <FormField control={form.control} name="contact.name" render={({ field }) => (
                    <FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="contact.phone" render={({ field }) => (
                        <FormItem><FormLabel>Contact Phone (Optional)</FormLabel><FormControl><Input placeholder="555-1234" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="contact.email" render={({ field }) => (
                        <FormItem><FormLabel>Contact Email (Optional)</FormLabel><FormControl><Input type="email" placeholder="contact@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
            </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full text-base" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : formMode === 'create' ? (
            <PlusCircle className="mr-2 h-5 w-5" />
          ) : (
            <Save className="mr-2 h-5 w-5" />
          )}
          {formMode === 'create' ? 'Create Listing' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
