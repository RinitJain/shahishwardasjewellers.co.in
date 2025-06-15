"use client";

import type { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from "firebase/firestore";
import type { UserProfile } from "@/types";

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as UserProfile;
          setUserProfile(profileData);
          // Simple admin check, e.g., based on email or a field in user profile
          setIsAdmin(profileData.email === 'admin@shah.com' || profileData.isAdmin === true);
        } else {
          // Handle case where user exists in Auth but not Firestore (e.g. new user before profile creation)
          // Or if profile is not expected for all users
          setUserProfile({uid: user.uid, email: user.email });
          setIsAdmin(user.email === 'admin@shah.com'); // Fallback check
        }
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, userProfile, loading, isAdmin };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
