
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Zap, Loader2, QrCode } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    // Simulate API call for verifying transaction ID
    setTimeout(() => {
      setIsProcessing(false);
      setIsDialogOpen(false);
      toast({
        title: 'Upgrade Successful!',
        description: 'Your payment has been confirmed. You are now on the Premium plan.',
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
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="font-headline text-2xl flex items-center justify-center sm:justify-start">
                          <QrCode className="mr-2 h-6 w-6"/> Scan to Pay
                        </DialogTitle>
                        <DialogDescription className="text-center sm:text-left">
                          Upgrade to Premium by paying {plan.price} via UPI.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePayment} className="grid gap-4 py-4">
                        <div className="flex flex-col items-center justify-center">
                           <Image
                            src="https://placehold.co/250x250.png"
                            alt="UPI QR Code Placeholder"
                            width={250}
                            height={250}
                            className="rounded-lg border p-1"
                            data-ai-hint="qr code"
                          />
                           <p className="text-sm text-muted-foreground mt-2">
                             Scan this with any UPI app to pay.
                           </p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="transaction-id">UPI Transaction ID</Label>
                          <Input id="transaction-id" placeholder="Enter ID to confirm payment" required />
                          <p className="text-xs text-muted-foreground">
                            After paying, enter the transaction ID from your UPI app.
                          </p>
                        </div>
                         <Button type="submit" size="lg" className="w-full mt-2" disabled={isProcessing}>
                          {isProcessing ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          ) : (
                            <Check className="mr-2 h-5 w-5" />
                          )}
                           Confirm Payment
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
