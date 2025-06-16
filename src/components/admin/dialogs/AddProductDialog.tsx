
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { ProductForm, type ProductFormData } from '../forms/ProductForm';
import type { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';

interface AddProductDialogProps {
  onProductAdd: (newProductData: Omit<Product, 'id'>) => void;
}

export function AddProductDialog({ onProductAdd }: AddProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      // The images string from the form needs to be converted to string[]
      const productDataForHook = {
        ...data,
        images: data.images.split(',').map(img => img.trim()).filter(img => img),
      };
      onProductAdd(productDataForHook);
      toast({ title: "Product Added", description: `${data.name} has been successfully added.` });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
      toast({ title: "Error", description: "Failed to add product. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to the inventory.
          </DialogDescription>
        </DialogHeader>
        <ProductForm onSubmit={handleSubmit} isLoading={isLoading} submitButtonText="Add Product" />
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
