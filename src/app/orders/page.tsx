
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, authLoading, router]);
  
  if (authLoading) {
    return <div className="container mx-auto flex min-h-[50vh] items-center justify-center py-12 text-center"><p>Verifying authentication...</p></div>;
  }
  
  if (!currentUser) {
    // This will be caught by the useEffect and redirected.
    return <div className="container mx-auto flex min-h-[50vh] items-center justify-center py-12 text-center"><p>Redirecting to login...</p></div>;
  }
  
  // Placeholder for orders data
  const orders: any[] = []; 

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4">
      <h1 className="font-headline text-3xl text-primary mb-8 text-center">My Orders</h1>
      {orders.length === 0 ? (
        <Card className="shadow-lg text-center py-12">
          <CardHeader>
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <CardTitle className="font-headline text-2xl">No Orders Yet</CardTitle>
            <CardDescription className="mt-2">
              You haven't placed any orders. Start shopping to see your orders here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/categories">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Map through orders here when data is available */}
          <p>Order listing will be here.</p>
        </div>
      )}
    </div>
  );
}
