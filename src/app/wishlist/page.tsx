"use client";

import { useWishlist } from '@/hooks/useWishlist';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HeartCrack } from 'lucide-react';
import { Metadata } from 'next'; // Metadata is not used in client components directly

// export const metadata: Metadata = { // This won't work here. Metadata should be in a Server Component or layout.
//   title: 'My Wishlist | Shah Ishwardas Jewellers',
//   description: 'View your saved jewellery items.',
// };

export default function WishlistPage() {
  const { wishlist, loading, clearWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">Loading your wishlist...</p>
      </div>
    );
  }
  
  // Set document title client-side as a workaround for metadata in client components
  if (typeof window !== 'undefined') {
     document.title = 'My Wishlist | Shah Ishwardas Jewellers';
  }


  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="font-headline text-3xl sm:text-4xl text-primary">My Wishlist</h1>
        {wishlist.length > 0 && (
          <Button variant="outline" onClick={clearWishlist} className="mt-4 sm:mt-0 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <HeartCrack className="mr-2 h-4 w-4" /> Clear Wishlist
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="font-headline text-2xl text-foreground mb-2">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your wishlist yet.
          </p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/categories">Start Browsing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
