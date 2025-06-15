import { Metadata } from 'next';
import { InventoryTable } from '@/components/admin/InventoryTable'; // Re-using for now
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Products | Admin Dashboard',
  description: 'Add, edit, or delete products.',
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-2xl text-primary">Manage Products</h1>
      </div>
      {/* Product management UI will go here. For now, re-using InventoryTable */}
      <InventoryTable />
    </div>
  );
}
