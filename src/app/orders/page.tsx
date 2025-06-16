
"use client";

import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";

export default function OrdersPage() {
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'My Orders | Shah Ishwardas Jewellers';
    }
  }, []);

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12 px-4">
      <h1 className="font-headline text-3xl text-primary mb-8 text-center">Order Information</h1>
      <Card className="shadow-lg text-center py-12">
        <CardHeader>
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <CardTitle className="font-headline text-2xl">Viewing Orders</CardTitle>
          <CardDescription className="mt-2">
            This section is for viewing order details. Currently, online ordering is not enabled.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">For inquiries about placing an order or existing orders, please contact us directly.</p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
