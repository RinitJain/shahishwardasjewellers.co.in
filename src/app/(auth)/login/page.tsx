
"use client";

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'Login | Shah Ishwardas Jewellers';
    }
    if (!loading && currentUser) {
      // If user is already logged in and auth state is loaded, redirect them
      router.replace('/profile'); 
    }
  }, [currentUser, loading, router]);

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <p>Loading...</p>
      </div>
    );
  }

  // If not loading and no current user, show the login form
  if (!currentUser) {
    return <LoginForm />;
  }

  // Fallback: If user is somehow present but redirect hasn't happened (should be brief)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <p>Redirecting...</p>
    </div>
  );
}
