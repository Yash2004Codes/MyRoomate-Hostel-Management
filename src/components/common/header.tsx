'use client';

import Link from 'next/link';
import { Home, Search, Sparkles, UserCircle, LogIn, UserPlus, LogOut, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';


export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, loading } = useAuth();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/smart-match', label: 'Smart Match', icon: Sparkles },
  ];

  const handleLogout = async () => {
    await logout();
    router.push('/'); // Redirect to home after logout
  };
  
  const userInitial = currentUser?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || '?';

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
           <Button variant="ghost" size="sm" asChild>
                <Link href="/owner/dashboard">
                  <Building className="mr-2 h-4 w-4" /> List your property
                </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
          {loading ? (
            <div className="h-8 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : currentUser ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                     <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/owner/dashboard')}>
                    <Building className="mr-2 h-4 w-4" />
                    <span>Owner Dashboard</span>
                </DropdownMenuItem>
                 <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
