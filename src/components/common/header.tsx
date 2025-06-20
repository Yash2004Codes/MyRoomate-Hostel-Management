
'use client';

import Link from 'next/link';
import { Home, Search, Sparkles, UserCircle, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context'; // Use the real AuthContext
import React from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, loading } = useAuth(); // Get user, logout, and loading state

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/smart-match', label: 'Smart Match', icon: Sparkles },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/'); // Redirect to home after logout
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12 2L1 9.78V22h7v-6h8v6h7V9.78L12 2zm0 3.47L18.94 10H5.06L12 5.47zM9 14v6H4v-7.31l5-3.63zm11 6h-5v-6l5-3.63V20z"/>
          </svg>
          <span className="font-headline text-2xl font-bold text-primary">College Cribs</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === item.href ? 'text-primary font-semibold' : 'text-foreground/70'
              )}
            >
              <item.icon className="inline-block h-5 w-5 mr-1 mb-0.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="h-8 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : currentUser ? (
            <>
              {/* You can add a profile link/dropdown here later */}
              <span className="text-sm text-foreground/80 hidden sm:inline">Hi, {currentUser.displayName || currentUser.email?.split('@')[0]}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
