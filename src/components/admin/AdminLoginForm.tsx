"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from '@/lib/authActions'; // Using same login server action
import { useAuth } from '@/contexts/AuthContext'; // To check admin status
import { Logo } from '@/components/Logo';

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

const ADMIN_EMAIL = 'admin@shah.com'; // Define admin email

export function AdminLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // const { currentUser, isAdmin: contextIsAdmin, loading: authLoading } = useAuth(); // Auth context can be used here

  const form = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminLoginFormData) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await loginUser(formData);
    

    if (result.success) {
      if (data.email === ADMIN_EMAIL) {
        // Specific check for admin email after successful Firebase Auth login
        // In a real app, this check would be more robust (e.g., custom claims or Firestore role)
        localStorage.setItem('isAdminAccessGrantedSIJ', 'true'); // Simple flag for demo
        toast({
          title: "Admin Login Successful!",
          description: "Welcome to the Admin Dashboard.",
        });
        router.push('/admin/dashboard');
      } else {
         toast({
            title: "Access Denied",
            description: "You do not have admin privileges.",
            variant: "destructive",
        });
        // Optionally sign out the non-admin user or redirect them
        // await auth.signOut(); 
        localStorage.removeItem('isAdminAccessGrantedSIJ');
      }
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "Invalid credentials or an error occurred.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Admin Login</CardTitle>
        <CardDescription>Access the Shah Ishwardas Jewellers Dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="admin@example.com" disabled={isLoading} />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} placeholder="••••••••" disabled={isLoading} />
            {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In as Admin"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
