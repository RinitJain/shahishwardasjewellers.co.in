
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isAdminLoginPage = pathname === '/admin/login';
  const isAdminDashboardPage = pathname.startsWith('/admin/dashboard');

  const showMainLayout = !isAdminLoginPage && !isAdminDashboardPage;

  useEffect(() => {
    document.title = 'Shah Ishwardas Jewellers';
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {showMainLayout ? (
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow bg-background text-foreground">
              {children}
            </main>
            <Footer />
          </div>
        ) : (
          children
        )}
        <Toaster />
      </body>
    </html>
  );
}
