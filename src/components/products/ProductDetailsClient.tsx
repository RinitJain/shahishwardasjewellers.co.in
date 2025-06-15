"use client";

import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { useToast } from "@/hooks/use-toast";
import { SocialShareButton } from "./SocialShareButton";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const isProductInWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from Wishlist", description: `${product.name} has been removed from your wishlist.` });
    } else {
      addToWishlist(product);
      toast({ title: "Added to Wishlist", description: `${product.name} has been added to your wishlist.` });
    }
  };

  // Placeholder for quantity selection and add to cart if implemented later
  // const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      {/* Add to Cart and Wishlist Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Placeholder for Add to Cart Button */}
        {/* <Button size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Add to Cart
        </Button> */}
        <Button
          size="lg"
          variant="outline"
          onClick={handleWishlistToggle}
          className={`flex-1 border-accent ${isProductInWishlist ? 'bg-accent/10 text-accent' : 'text-accent hover:bg-accent hover:text-accent-foreground'}`}
          aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`mr-2 h-5 w-5 ${isProductInWishlist ? 'fill-current' : ''}`} />
          {isProductInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
        </Button>
      </div>
      
      {/* Social Share Button */}
      <SocialShareButton productName={product.name} />
    </div>
  );
}
