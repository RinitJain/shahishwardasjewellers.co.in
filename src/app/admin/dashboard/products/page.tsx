
"use client";

import { Metadata } from 'next'; // Metadata is not used directly in client components like this
import { InventoryTable } from '@/components/admin/InventoryTable';
import { AddProductDialog } from '@/components/admin/dialogs/AddProductDialog';
import { useProductManagement } from '@/hooks/useProductManagement';
import type { Product } from '@/types';
import { useEffect } from 'react';

// export const metadata: Metadata = { // Cannot be used in client component
//   title: 'Manage Products | Admin Dashboard',
//   description: 'Add, edit, or delete products.',
// };

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoading } = useProductManagement();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'Manage Products | Admin Dashboard';
    }
  }, []);

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    addProduct(newProductData);
  };

  const handleUpdateProduct = (updatedProductData: Product) => {
    updateProduct(updatedProductData);
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="font-headline text-2xl text-primary">Manage Products</h1>
        <AddProductDialog onProductAdd={handleAddProduct} />
      </div>
      
      <InventoryTable
        products={products}
        onEditProduct={handleUpdateProduct} // Pass the update function directly
        onDeleteProduct={handleDeleteProduct}
        isLoading={isLoading}
      />
    </div>
  );
}
