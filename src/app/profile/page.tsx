
import { Header } from '@/components/common/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <UserCircle className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle className="text-3xl font-headline">User Profile</CardTitle>
              <CardDescription>This page is under construction.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                In the future, you will be able to manage your account details,
                notification preferences, and more right here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
