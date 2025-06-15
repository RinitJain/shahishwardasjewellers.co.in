"use server";

import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types';
import { z } from 'zod';

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal('')),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});


export async function signupUser(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validation = SignupSchema.safeParse(rawFormData);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }
  
  const { email, password, username, phoneNumber } = validation.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userProfile: Omit<UserProfile, 'uid'> & { createdAt: any } = {
      email: user.email,
      username: username,
      phoneNumber: phoneNumber || '',
      isAdmin: email === 'admin@shah.com', // Basic admin assignment
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userProfile);
    return { success: true, userId: user.uid };
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "This email address is already in use.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "The password is too weak.";
    }
    return { success: false, error: errorMessage };
  }
}


export async function loginUser(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validation = LoginSchema.safeParse(rawFormData);

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  const { email, password } = validation.data;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, userId: userCredential.user.uid };
  } catch (error: any) {
     let errorMessage = "Invalid email or password.";
     if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
       errorMessage = "Invalid email or password.";
     }
    return { success: false, error: errorMessage };
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!uid) return null;
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return { uid, ...userDocSnap.data() } as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
