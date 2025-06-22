'use client';

import Link from 'next/link';
import { Home, Search, Sparkles, UserCircle, LogIn, UserPlus, LogOut, Building, Menu } from 'lucide-react';
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";


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

        {/* --- Desktop Navigation --- */}
        <div className="hidden md:flex items-center space-x-2">
           <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-4">
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

        {/* --- Mobile Navigation (Hamburger Menu) --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px]">
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 mt-6">
                  {navItems.map((item) => (
                     <SheetClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className={cn(
                            'text-lg flex items-center p-2 rounded-md transition-colors hover:bg-accent',
                            pathname === item.href ? 'bg-accent font-semibold text-accent-foreground' : 'text-foreground/80'
                          )}
                        >
                          <item.icon className="inline-block h-5 w-5 mr-3" />
                          {item.label}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
                <Separator className="my-6" />

                <div className="flex flex-col gap-4">
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                          <Link href="/owner/dashboard" className="w-full">
                            <Building className="mr-2 h-4 w-4" /> List your property
                          </Link>
                      </Button>
                    </SheetClose>
                </div>

                <div className="mt-auto flex flex-col gap-4 py-4">
                  <Separator />
                   {loading ? (
                      <div className="h-10 w-full animate-pulse bg-muted rounded-md" />
                    ) : currentUser ? (
                       <div className="text-left">
                          <p className="font-semibold">{currentUser.displayName}</p>
                          <p className="text-sm text-muted-foreground mb-4">{currentUser.email}</p>
                          <SheetClose asChild>
                            <Button variant="destructive" onClick={handleLogout} className="w-full">
                              <LogOut className="mr-2 h-4 w-4"/> Log Out
                            </Button>
                          </SheetClose>
                       </div>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Button asChild>
                            <Link href="/login" className="w-full">
                              <LogIn className="mr-2 h-4 w-4" /> Login
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button variant="secondary" asChild>
                            <Link href="/signup" className="w-full">
                              <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                            </Link>
                          </Button>
                        </SheetClose>
                      </>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
