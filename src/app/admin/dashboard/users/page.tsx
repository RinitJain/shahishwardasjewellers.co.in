import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersRound } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Users | Admin Dashboard',
  description: 'View and manage user accounts.',
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl text-primary">Manage Users</h1>
      <Card>
        <CardHeader>
          <UsersRound className="h-12 w-12 text-muted-foreground mb-2" />
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View user details, manage roles, and handle accounts. This section is under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Future functionality will include user search, role assignment, and account status management.
          </p>
        </CardContent>
      </Card>
      {/* Placeholder for user list/table */}
    </div>
  );
}
