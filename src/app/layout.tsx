'use client'; // Required for usePathname

// Metadata export from client components is not directly used for static generation.
// For dynamic titles/meta, use `useEffect` or `next/head`.
// import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// export const metadata: Metadata = { // Cannot export metadata statically from a Client Component
//   title: 'Shah Ishwardas Jewellers',
//   description: 'Exquisite jewellery for every occasion.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determine if the current path should use the main layout (Header/Footer)
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAdminLoginPage = pathname === '/admin/login'; // Admin login has its own minimal layout
  const isAdminDashboardPage = pathname.startsWith('/admin/dashboard'); // Admin dashboard has its specific layout

  const showMainLayout = !isAuthPage && !isAdminLoginPage && !isAdminDashboardPage;

  // Handle document title for client component as static metadata export is not available
  useEffect(() => {
    // You might want to set a default title or derive it based on pathname for better SEO
    // For now, a generic title is set.
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
        <AuthProvider>
          {showMainLayout ? (
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow bg-background text-foreground">
                {children}
              </main>
              <Footer />
            </div>
          ) : (
            // For pages that manage their own full layout (like auth or admin pages)
            children
          )}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
