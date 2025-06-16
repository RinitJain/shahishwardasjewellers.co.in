
"use client";

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { UserNav } from '@/components/layout/UserNav';
import { SearchBarClient } from '@/components/common/SearchBarClient';
import { Button } from '@/components/ui/button';
import { Heart, Menu } from 'lucide-react';
import { categories } from '@/lib/data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* LEFT SIDE: Mobile Menu Trigger, Logo, (Desktop UserNav) */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <div className="md:hidden"> {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Logo />
                  <div className="pt-4 mt-4 border-t"> {/* UserNav in mobile sheet */}
                    <UserNav />
                  </div>
                  <Link
                    href="/"
                    className={cn(
                      "text-base font-medium transition-colors", 
                      pathname === "/" ? "text-primary font-semibold" : "hover:text-primary"
                    )}
                  >
                    Home
                  </Link>
                  {categories.slice(0,4).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className={cn(
                        "text-base font-medium transition-colors", 
                        pathname === `/categories/${category.slug}` ? "text-primary font-semibold" : "hover:text-primary"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className={cn(
                      "text-base font-medium transition-colors", 
                      pathname === "/categories" ? "text-primary font-semibold" : "hover:text-primary"
                    )}
                  >
                    All Categories
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Logo /> {/* Logo always present in this left block */}
          <div className="hidden md:block"> {/* UserNav on desktop, next to logo */}
            <UserNav />
          </div>
        </div>

        {/* CENTER: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center flex-1 min-w-0 space-x-4 lg:space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors",
              pathname === "/" ? "text-primary font-semibold" : "hover:text-primary"
            )}
          >
            Home
          </Link>
          {categories.slice(0, 3).map((category) => ( // Show first 3 categories in header
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={cn(
                "transition-colors",
                pathname === `/categories/${category.slug}` ? "text-primary font-semibold" : "hover:text-primary"
              )}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/categories"
            className={cn(
              "transition-colors",
               pathname === "/categories" && !categories.slice(0,3).some(c => pathname === `/categories/${c.slug}`) ? "text-primary font-semibold" : "hover:text-primary"
            )}
          >
            More Categories
          </Link>
        </nav>

        {/* RIGHT SIDE: Search, Wishlist (Desktop) */}
        <div className="flex items-center justify-end space-x-2 md:space-x-4 flex-shrink-0">
          <div className="hidden sm:block w-full max-w-xs md:max-w-sm">
             <SearchBarClient />
          </div>
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="sm:hidden p-2 border-t border-border/40"> {/* Mobile Search Bar */}
        <SearchBarClient />
      </div>
    </header>
  );
}
