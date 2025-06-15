
import { Metadata } from 'next';
import { InventoryTable } from '@/components/admin/InventoryTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, ShoppingBag, Users, Activity } from 'lucide-react'; // Changed DollarSign to IndianRupee

export const metadata: Metadata = {
  title: 'Admin Dashboard | Shah Ishwardas Jewellers',
  description: 'Manage inventory and settings for Shah Ishwardas Jewellers.',
};

// Dummy data for stats
const stats = [
  { title: "Total Revenue", value: "₹125,670", icon: IndianRupee, change: "+12.5%" }, // Changed $ to ₹ and icon
  { title: "Total Orders", value: "1,450", icon: ShoppingBag, change: "+5.2%" },
  { title: "Active Users", value: "875", icon: Users, change: "+2.1%" },
  { title: "Site Activity", value: "High", icon: Activity, change: "Last 24h" },
];


export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl text-primary">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <InventoryTable />
      {/* Other admin components can be added here */}
    </div>
  );
}
