
"use client";

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import Image from "next/image";
import { Edit, Trash2, PackageOpen } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

import { EditProductDialog } from './dialogs/EditProductDialog';
import { DeleteConfirmationDialog } from './dialogs/DeleteConfirmationDialog';

interface InventoryTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void; // Triggered when edit button is clicked
  onDeleteProduct: (productId: string) => void; // Triggered when delete is confirmed
  isLoading: boolean;
}

export function InventoryTable({ products, onEditProduct, onDeleteProduct, isLoading }: InventoryTableProps) {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (productId: string) => {
    setDeletingProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingProductId) {
      onDeleteProduct(deletingProductId);
      toast({ title: "Product Deleted", description: "The product has been removed." });
      setDeletingProductId(null);
    }
  };

  if (isLoading) {
    return <p>Loading inventory...</p>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-card p-6 rounded-lg shadow">
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-headline text-primary mb-2">Inventory is Empty</h2>
        <p className="text-muted-foreground">No products found. Try adding some!</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow">
        <Table>
          <TableCaption>A list of current products in inventory.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] sm:w-[80px] p-2 sm:p-4">Image</TableHead>
              <TableHead className="p-2 sm:p-4">Name</TableHead>
              <TableHead className="hidden md:table-cell p-2 sm:p-4">Category</TableHead>
              <TableHead className="text-right p-2 sm:p-4">Price</TableHead>
              <TableHead className="text-center hidden sm:table-cell p-2 sm:p-4">Stock</TableHead>
              <TableHead className="text-center p-2 sm:p-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-2 sm:p-4">
                  <Image 
                    src={product.images[0] || 'https://placehold.co/150x200.png'} 
                    alt={product.name} 
                    width={50} 
                    height={66} 
                    className="rounded object-cover aspect-[3/4]"
                    data-ai-hint={product['data-ai-hint'] || "product image"}
                  />
                </TableCell>
                <TableCell className="font-medium p-2 sm:p-4">{product.name}</TableCell>
                <TableCell className="capitalize hidden md:table-cell p-2 sm:p-4">{product.category.replace('-', ' ')}</TableCell>
                <TableCell className="text-right p-2 sm:p-4">Rs.{product.price.toFixed(2)}</TableCell>
                <TableCell className="text-center hidden sm:table-cell p-2 sm:p-4">
                  <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
                    {product.stock > 0 ? product.stock : "Out"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center p-2 sm:p-4">
                  <div className="flex justify-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" aria-label="Edit product" onClick={() => handleEditClick(product)}>
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Delete product" onClick={() => handleDeleteClick(product.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isEditDialogOpen && editingProduct && (
        <EditProductDialog
          product={editingProduct}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onProductUpdate={(updatedData) => {
             onEditProduct(updatedData); // This will call updateProduct from the hook
             setIsEditDialogOpen(false);
          }}
        />
      )}

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={products.find(p => p.id === deletingProductId)?.name || "the selected product"}
      />
    </>
  );
}
