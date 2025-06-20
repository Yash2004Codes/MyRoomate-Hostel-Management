'use client';

import React, { useState } from 'react';
import { Header } from '@/components/common/header';
import { SmartMatchForm } from '@/components/smart-match/smart-match-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { smartMatch, type SmartMatchInput, type SmartMatchOutput } from '@/ai/flows/smart-match';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, CheckCircle, Sparkles, Lightbulb } from 'lucide-react';
import Link from 'next/link'; // Import Link

export default function SmartMatchPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SmartMatchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSmartMatchSubmit = async (values: SmartMatchInput) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const output = await smartMatch(values);
      setResults(output);
      toast({
        title: 'Smart Match Found!',
        description: 'Check out your personalized accommodation suggestions.',
      });
    } catch (err) {
      console.error('Smart Match error:', err);
      let errorMessage = 'An unexpected error occurred.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      toast({
        title: 'Smart Match Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-2 animate-pulse" />
              <CardTitle className="text-4xl font-headline">AI Smart Match</CardTitle>
              <CardDescription className="text-lg text-foreground/80">
                Let our AI find the perfect crib for you based on your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <SmartMatchForm onSubmit={handleSmartMatchSubmit} loading={loading} />
            </CardContent>
          </Card>

          {error && (
            <Card className="mt-8 shadow-lg bg-destructive/10 border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <AlertTriangle className="mr-2 h-6 w-6" /> Error
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
              </CardContent>
            </Card>
          )}

          {results && (
            <Card className="mt-8 shadow-xl animate-fade-in bg-primary/5">
              <CardHeader>
                <CardTitle className="text-3xl font-headline text-primary flex items-center">
                  <CheckCircle className="mr-3 h-8 w-8 text-green-500" /> Your Smart Match Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500"/>Reasoning:</h3>
                  <p className="text-foreground/90 bg-muted/50 p-4 rounded-md border italic">{results.reasoning}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Suggested Accommodations:</h3>
                  {results.accommodationSuggestions && results.accommodationSuggestions.length > 0 ? (
                    <ul className="space-y-3">
                      {results.accommodationSuggestions.map((suggestion, index) => (
                        <li key={index} className="p-4 border rounded-lg shadow-sm bg-background hover:shadow-md transition-shadow">
                          <p className="font-medium text-foreground">{suggestion}</p>
                          {/* You might want to link these suggestions if they match names from your DB */}
                           <Button variant="link" asChild className="p-0 h-auto text-sm mt-1">
                             {/* This is a placeholder link. Actual search/link logic would be more complex. */}
                             <Link href={`/search?q=${encodeURIComponent(suggestion.split(" ")[0])}`}>Search for this accommodation</Link>
                           </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No specific accommodations could be matched based on the AI's current knowledge. Try broadening your criteria or checking the general search.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/search">Explore All Listings</Link>
                 </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
       <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} College Cribs. AI-Powered Housing.
      </footer>
    </div>
  );
}
