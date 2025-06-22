import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BedDouble, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/common/header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-primary animate-fade-in">
              Find Your <span className="text-accent-foreground">Perfect</span> College Room
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto animate-fade-in animation-delay-300">
              Discover the best PGs, hostels, and apartments near your campus.
              Personalized, easy, and stress-free.
            </p>
            <div className="space-x-4 animate-fade-in animation-delay-600">
              <Button size="lg" asChild className="transform transition-transform hover:scale-105 shadow-lg">
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" /> Start Searching
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="transform transition-transform hover:scale-105 shadow-lg">
                <Link href="/smart-match">
                  <Sparkles className="mr-2 h-5 w-5" /> Get Smart Matches
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-headline font-semibold text-center mb-12 text-primary-foreground bg-primary py-2 px-4 inline-block rounded-md shadow-md">
              Why Choose CollegeRooms?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="h-12 w-12 text-primary" />,
                  title: 'Advanced Search',
                  description: 'Filter by price, distance, amenities, and type to find exactly what you need.',
                },
                {
                  icon: <Sparkles className="h-12 w-12 text-primary" />,
                  title: 'AI Smart Match',
                  description: 'Our AI suggests accommodations tailored to your budget and preferences.',
                },
                {
                  icon: <BedDouble className="h-12 w-12 text-primary" />,
                  title: 'Detailed Listings',
                  description: 'Comprehensive info with photos, amenities, pricing, and direct owner contact.',
                },
              ].map((feature, index) => (
                <Card key={feature.title} className="text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-slide-in-up" style={{animationDelay: `${index * 200}ms`}}>
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-headline font-semibold text-center mb-12 text-primary">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { title: "1. Tell Us Your Needs", description: "Use our search filters or the Smart Match tool." },
                { title: "2. Browse Listings", description: "Explore detailed listings with photos and reviews." },
                { title: "3. Connect & Secure", description: "Contact owners directly and find your new home." },
              ].map((step, index) => (
                 <div key={step.title} className="animate-slide-in-up" style={{animationDelay: `${600 + index * 200}ms`}}>
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-md">{index + 1}</div>
                  <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section className="py-20 bg-accent/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-headline font-semibold mb-6 text-primary">Ready to Find Your Room?</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who found their ideal accommodation with CollegeRooms.
            </p>
            <Button size="lg" asChild className="transform transition-transform hover:scale-105 shadow-lg">
              <Link href="/signup">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-800 text-gray-300 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} CollegeRooms. All rights reserved.</p>
          <p className="text-sm">Your hassle-free student housing solution.</p>
        </div>
      </footer>
    </div>
  );
}
