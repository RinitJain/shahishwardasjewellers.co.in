
"use client"; // For useWishlist hook

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const isProductInWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking button
    e.stopPropagation();
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from Wishlist", description: `${product.name} has been removed from your wishlist.` });
    } else {
      addToWishlist(product);
      toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist.` });
    }
  };

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:border-accent">
      <Link href={`/products/${product.slug}`} className="flex-grow">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={800}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint={product['data-ai-hint'] || product.name.toLowerCase()}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="mb-1 font-headline text-lg text-primary group-hover:text-accent transition-colors truncate" title={product.name}>
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground capitalize">{product.category.replace('-', ' ')}</p>
          <p className="mt-2 font-semibold text-base text-foreground">₹{product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-3 border-t">
        <div className="flex w-full items-center justify-between gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors" asChild>
            <Link href={`/products/${product.slug}`}>
              <Eye className="mr-2 h-4 w-4" /> View
            </Link>
          </Button>
          <Button
            variant={isProductInWishlist ? "secondary" : "ghost"}
            size="icon"
            className={`rounded-full transition-colors ${isProductInWishlist ? 'text-red-500 hover:bg-red-100' : 'text-muted-foreground hover:text-red-500 hover:bg-red-100/50'}`}
            onClick={handleWishlistToggle}
            aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
