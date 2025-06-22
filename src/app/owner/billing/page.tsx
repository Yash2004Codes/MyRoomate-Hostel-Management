
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    priceDescription: '/month',
    features: [
      'Up to 3 active listings',
      'Standard search placement',
      'Basic owner dashboard',
      'Email support',
    ],
    isCurrent: true,
    cta: 'Your Current Plan',
  },
  {
    name: 'Premium',
    price: '₹499',
    priceDescription: '/month',
    features: [
      'Unlimited active listings',
      'Featured placement in search',
      'Advanced analytics dashboard',
      'Priority phone & email support',
    ],
    isCurrent: false,
    cta: 'Upgrade to Premium',
  },
];

export default function BillingPage() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsDialogOpen(false);
      toast({
        title: 'Upgrade Successful!',
        description: 'You are now on the Premium plan.',
      });
      // Here you would typically update the user's state in your database
    }, 2000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Subscription Plans</h1>
        <p className="text-lg text-muted-foreground mb-10">Choose the plan that's right for your business.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className={`shadow-lg text-left flex flex-col ${plan.name === 'Premium' ? 'border-primary border-2 shadow-primary/20' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-3xl font-headline">{plan.name}</CardTitle>
                  {plan.name === 'Premium' && <Zap className="h-7 w-7 text-primary" />}
                </div>
                <CardDescription className="text-4xl font-bold text-foreground">
                  {plan.price} <span className="text-base font-normal text-muted-foreground">{plan.priceDescription}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.name === 'Premium' ? (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full text-lg" disabled={plan.isCurrent}>
                        <Star className="mr-2 h-5 w-5" /> {plan.cta}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Upgrade to Premium</DialogTitle>
                        <DialogDescription>
                          Enter your payment details to unlock all premium features. This is a simulation.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePayment} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input id="expiry-date" placeholder="MM/YY" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                         <Button type="submit" size="lg" className="w-full mt-4" disabled={isProcessing}>
                          {isProcessing ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Zap className="mr-2 h-5 w-5" />
                          )}
                           Pay {plan.price}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button size="lg" className="w-full text-lg" disabled={plan.isCurrent} variant="outline">
                    {plan.cta}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
