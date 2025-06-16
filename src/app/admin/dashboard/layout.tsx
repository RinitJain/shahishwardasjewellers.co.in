
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, ShoppingBag, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAllowedToRender, setIsAllowedToRender] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAdminAccessGranted = localStorage.getItem('isAdminAccessGrantedSIJ') === 'true';
      if (isAdminAccessGranted) {
        setIsAllowedToRender(true);
      } else {
        setIsAllowedToRender(false);
        router.replace('/admin/login');
      }
    }
    setIsVerifying(false);
  }, [router]);

  const handleAdminLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdminAccessGrantedSIJ');
    }
    router.push('/admin/login');
  };

  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Verifying admin session...</p>
      </div>
    );
  }

  if (!isAllowedToRender) {
     // This should ideally not be reached if router.replace works in useEffect,
     // but serves as a fallback or during the brief moment before redirection.
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Redirecting to admin login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="sticky top-0 h-screen w-64 flex-col border-r bg-background p-4 hidden md:flex">
        <div className="mb-6">
          <Logo />
        </div>
        <nav className="flex-grow space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/dashboard/products">
              <ShoppingBag className="mr-2 h-4 w-4" /> Products
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/dashboard/orders">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Orders
            </Link>
          </Button>
           <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/dashboard/users">
              <Users className="mr-2 h-4 w-4" /> Users
            </Link>
          </Button>
        </nav>
        <div>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </Button>
          <Button variant="outline" className="w-full justify-start mt-2" onClick={handleAdminLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <header className="md:hidden flex justify-between items-center mb-4">
            <Logo />
            <Button variant="outline" size="sm" onClick={handleAdminLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </header>
        {children}
      </main>
    </div>
  );
}
