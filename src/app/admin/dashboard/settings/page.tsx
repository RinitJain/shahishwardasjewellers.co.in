import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Site Settings | Admin Dashboard',
  description: 'Configure general site settings.',
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl text-primary">Site Settings</h1>
      <Card>
        <CardHeader>
          <Settings2 className="h-12 w-12 text-muted-foreground mb-2" />
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Manage general configuration for your store. These are placeholders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input id="storeName" defaultValue="Shah Ishwardas Jewellers" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeEmail">Support Email</Label>
            <Input id="storeEmail" type="email" defaultValue="support@shah.com" />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="maintenanceMode" />
            <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
