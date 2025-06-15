import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { UserNav } from '@/components/layout/UserNav';
import { SearchBarClient } from '@/components/common/SearchBarClient';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Menu } from 'lucide-react'; // Added Menu for mobile
import { categories } from '@/lib/data';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
              <nav className="flex flex-col space-y-4">
                <Logo />
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
                {categories.slice(0,4).map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
                <Link href="/categories" className="text-lg font-medium hover:text-primary transition-colors">All Categories</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center">
          <Logo />
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          {categories.slice(0, 3).map((category) => ( // Show first 3 categories in header
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
          <Link href="/categories" className="hover:text-primary transition-colors">
            More Categories
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <div className="hidden sm:block w-full max-w-xs md:max-w-sm">
             <SearchBarClient />
          </div>
          <Button variant="ghost" size="icon" asChild aria-label="Wishlist">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          {/* Shopping cart icon can be added here if cart functionality is implemented */}
          {/* <Button variant="ghost" size="icon" asChild aria-label="Shopping Cart">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button> */}
          <UserNav />
        </div>
      </div>
      <div className="sm:hidden p-2 border-t border-border/40">
        <SearchBarClient />
      </div>
    </header>
  );
}
