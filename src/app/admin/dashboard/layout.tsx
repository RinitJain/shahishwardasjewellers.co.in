"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard, ShoppingBag, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { auth } from '@/lib/firebase';


export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, isAdmin, loading } = useAuth();
  const [isClientAdmin, setIsClientAdmin] = useState(false); // Client-side check for robustness

  useEffect(() => {
     // Check local storage flag as a fallback or for quick UI updates
    const localAdminFlag = localStorage.getItem('isAdminAccessGrantedSIJ') === 'true';
    setIsClientAdmin(localAdminFlag);

    if (!loading) {
      if (!currentUser || (!isAdmin && !localAdminFlag)) {
        router.replace('/admin/login');
      }
    }
  }, [currentUser, isAdmin, loading, router]);

  const handleAdminLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('isAdminAccessGrantedSIJ');
    router.push('/admin/login');
  };

  if (loading || (!currentUser && !isClientAdmin) || (!isAdmin && !isClientAdmin)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading or authenticating admin...</p>
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
            {/* Mobile nav trigger can be added here */}
        </header>
        {children}
      </main>
    </div>
  );
}
