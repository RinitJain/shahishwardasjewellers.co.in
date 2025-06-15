"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareButtonProps {
  productName: string;
  productUrl?: string; // If not provided, window.location.href will be used
}

export function SocialShareButton({ productName, productUrl }: SocialShareButtonProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const urlToShare = productUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this beautiful ${productName} from Shah Ishwardas Jewellers!`,
          url: urlToShare,
        });
        toast({ title: "Shared successfully!" });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({ title: "Sharing failed", description: "Could not share this item.", variant: "destructive" });
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      try {
        await navigator.clipboard.writeText(urlToShare);
        toast({ title: "Link Copied!", description: "Product link copied to clipboard." });
      } catch (err) {
        toast({ title: "Copy Failed", description: "Could not copy link to clipboard.", variant: "destructive" });
      }
    }
  };

  return (
    <Button variant="outline" onClick={handleShare} className="w-full sm:w-auto">
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
}
