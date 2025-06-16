
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';
import { products as initialProducts } from '@/lib/data'; // Fallback initial data

const PRODUCTS_STORAGE_KEY = 'adminManagedProductsSIJ';

export function useProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Initialize with mock data if localStorage is empty
        setProducts(initialProducts);
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(initialProducts));
      }
    } catch (error) {
      console.error("Failed to load products from localStorage", error);
      setProducts(initialProducts); // Fallback to initial mock data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        console.error("Failed to save products to localStorage", error);
      }
    }
  }, [products, isLoading]);

  const addProduct = useCallback((newProduct: Omit<Product, 'id' | 'slug'> & { slug?: string }) => {
    setProducts((prevProducts) => {
      const fullProduct: Product = {
        ...newProduct,
        id: Date.now().toString(), // Simple unique ID
        slug: newProduct.slug || generateSlug(newProduct.name),
        images: Array.isArray(newProduct.images) ? newProduct.images : (typeof newProduct.images === 'string' ? newProduct.images.split(',').map(img => img.trim()).filter(img => img) : [])
      };
      return [...prevProducts, fullProduct];
    });
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? {
        ...updatedProduct,
        images: Array.isArray(updatedProduct.images) ? updatedProduct.images : (typeof updatedProduct.images === 'string' ? updatedProduct.images.split(',').map(img => img.trim()).filter(img => img) : [])
      } : p))
    );
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  }, []);
  
  const getProductById = useCallback((productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  }, [products]);

  return { products, addProduct, updateProduct, deleteProduct, isLoading, getProductById };
}

// Helper function (can be moved to utils if needed elsewhere)
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
