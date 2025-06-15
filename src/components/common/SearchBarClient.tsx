
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { products as allProducts, searchProducts } from '@/lib/data'; // Using mock data
import type { Product } from '@/types';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SearchBarClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredProducts = searchProducts(searchTerm);
      setResults(filteredProducts);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setResults([]); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleItemClick = () => {
    setIsFocused(false);
    setSearchTerm('');
    setResults([]);
  };


  return (
    <div className="relative w-full max-w-md" ref={searchContainerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for jewellery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full rounded-md bg-background pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-accent"
          aria-label="Search products"
        />
      </div>
      {isFocused && results.length > 0 && (
        <ScrollArea className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg max-h-96">
          <div className="p-2">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="block p-3 hover:bg-accent/10 rounded-md transition-colors"
                onClick={handleItemClick}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                    data-ai-hint={product['data-ai-hint'] || 'jewelry item'}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">Rs.{product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
       {isFocused && searchTerm.length > 1 && results.length === 0 && (
         <div className="absolute z-50 mt-1 w-full rounded-md border bg-background p-4 shadow-lg">
           <p className="text-sm text-muted-foreground">No products found for "{searchTerm}".</p>
         </div>
       )}
    </div>
  );
}
