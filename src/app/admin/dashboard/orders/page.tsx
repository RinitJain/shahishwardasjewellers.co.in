import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageSearch } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Orders | Admin Dashboard',
  description: 'View and manage customer orders.',
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl text-primary">Manage Orders</h1>
      <Card>
        <CardHeader>
          <PackageSearch className="h-12 w-12 text-muted-foreground mb-2" />
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            View, track, and update customer orders. This section is under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Future enhancements will include order filtering, status updates, and detailed views.
          </p>
        </CardContent>
      </Card>
      {/* Placeholder for order list/table */}
    </div>
  );
}
