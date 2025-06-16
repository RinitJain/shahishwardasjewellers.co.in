
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ProductForm, type ProductFormData } from '../forms/ProductForm';
import type { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EditProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

export function EditProductDialog({ product, isOpen, onOpenChange, onProductUpdate }: EditProductDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: ProductFormData) => {
    if (!product) return;
    setIsLoading(true);
    try {
      const updatedProductData: Product = {
        ...product, // Retain existing ID and other potentially uneditable fields
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        images: data.images.split(',').map(img => img.trim()).filter(img => img), // Convert comma-separated string to array
      };
      onProductUpdate(updatedProductData);
      toast({ title: "Product Updated", description: `${data.name} has been successfully updated.` });
      onOpenChange(false); // Close dialog
    } catch (error) {
      console.error("Failed to update product:", error);
      toast({ title: "Error", description: "Failed to update product. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product: {product.name}</DialogTitle>
          <DialogDescription>
            Update the details for this product.
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
            onSubmit={handleSubmit} 
            initialData={product} 
            isLoading={isLoading}
            submitButtonText="Save Changes"
        />
        <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
