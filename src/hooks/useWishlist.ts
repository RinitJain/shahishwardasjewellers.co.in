"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';

const WISHLIST_STORAGE_KEY = 'shahIshwardasJewellersWishlist';

interface WishlistHook {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId:string) => boolean;
  clearWishlist: () => void;
  loading: boolean;
}

export function useWishlist(): WishlistHook {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage", error);
      // Fallback to empty wishlist or handle error appropriately
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) { // Only save to localStorage after initial load
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlist, loading]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);
  
  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, loading };
}
