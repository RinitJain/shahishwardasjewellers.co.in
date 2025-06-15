"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  altText: string;
  productHint?: string;
}

export function ProductImageGallery({ images, altText, productHint }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || 'https://placehold.co/800x1000.png');

  if (!images || images.length === 0) {
    images = ['https://placehold.co/800x1000.png']; // Default placeholder
    setSelectedImage(images[0]);
  }


  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[600px] pb-2 md:pb-0 md:pr-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                "relative aspect-square w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent",
                selectedImage === image ? "border-accent" : "border-transparent hover:border-muted-foreground/50"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${altText} - view ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-opacity hover:opacity-80"
                data-ai-hint={productHint || "jewelry detail"}
              />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 relative aspect-[4/5] md:aspect-[3/4] w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={selectedImage}
          alt={altText}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300"
          priority={true} // For LCP
          data-ai-hint={productHint || "jewelry main"}
        />
      </div>
    </div>
  );
}
