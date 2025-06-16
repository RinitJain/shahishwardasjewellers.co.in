
"use client";

import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { SearchBarClient } from '@/components/common/SearchBarClient';
import { Button } from '@/components/ui/button';
import { Heart, Menu, LayoutDashboard } from 'lucide-react';
import { categories } from '@/lib/data';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  useEffect(() => {
    if (isMobileSheetOpen) {
      setIsMobileSheetOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          <div className="md:hidden">
            <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                <SheetHeader className="mb-4">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className={cn(
                      "block py-2 text-base font-medium transition-colors rounded-md px-3", 
                      pathname === "/" ? "bg-accent text-accent-foreground" : "hover:bg-muted hover:text-primary"
                    )}
                  >
                    Home
                  </Link>
                  {categories.slice(0,4).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className={cn(
                        "block py-2 text-base font-medium transition-colors rounded-md px-3", 
                        pathname === `/categories/${category.slug}` ? "bg-accent text-accent-foreground" : "hover:bg-muted hover:text-primary"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    className={cn(
                      "block py-2 text-base font-medium transition-colors rounded-md px-3", 
                      pathname === "/categories" ? "bg-accent text-accent-foreground" : "hover:bg-muted hover:text-primary"
                    )}
                  >
                    All Categories
                  </Link>
                   <Link
                    href="/wishlist"
                     className={cn(
                        "block py-2 text-base font-medium transition-colors rounded-md px-3", 
                        pathname === "/wishlist" ? "bg-accent text-accent-foreground" : "hover:bg-muted hover:text-primary"
                    )}
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/admin/login"
                     className={cn(
                        "block py-2 text-base font-medium transition-colors rounded-md px-3", 
                        pathname === "/admin/login" ? "bg-accent text-accent-foreground" : "hover:bg-muted hover:text-primary"
                    )}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4 inline-block" /> Dashboard
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Logo />
        </div>

        <nav className="hidden md:flex items-center justify-center flex-1 min-w-0 space-x-4 lg:space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors px-2 py-1 rounded-md",
              pathname === "/" ? "text-primary font-semibold bg-primary/10" : "hover:text-primary hover:bg-muted"
            )}
          >
            Home
          </Link>
          {categories.slice(0, 3).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={cn(
                "transition-colors px-2 py-1 rounded-md",
                pathname === `/categories/${category.slug}` ? "text-primary font-semibold bg-primary/10" : "hover:text-primary hover:bg-muted"
              )}
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/categories"
            className={cn(
              "transition-colors px-2 py-1 rounded-md",
               pathname === "/categories" && !categories.slice(0,3).some(c => pathname === `/categories/${c.slug}`) ? "text-primary font-semibold bg-primary/10" : "hover:text-primary hover:bg-muted"
            )}
          >
            More Categories
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-2 md:space-x-3 flex-shrink-0">
          <div className="hidden sm:block w-full max-w-xs md:max-w-sm">
             <SearchBarClient />
          </div>
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist" className="h-9 w-9">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" asChild className="h-9 hidden md:inline-flex">
            <Link href="/admin/login">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
        </div>
      </div>
      <div className="sm:hidden p-2 border-t border-border/40">
        <SearchBarClient />
      </div>
    </header>
  );
}
