
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
import { Logo } from '@/components/Logo';

const adminLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

const HARDCODED_ADMIN_EMAIL = 'ishwardasshah808@gmail.com';
const HARDCODED_ADMIN_PASSWORD = 'SIJ@1234';

export function AdminLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: AdminLoginFormData) {
    setIsLoading(true);

    if (data.email === HARDCODED_ADMIN_EMAIL && data.password === HARDCODED_ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAdminAccessGrantedSIJ', 'true');
      }
      toast({
        title: "Admin Login Successful!",
        description: "Welcome to the Admin Dashboard.",
      });
      router.push('/admin/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
       if (typeof window !== 'undefined') {
        localStorage.removeItem('isAdminAccessGrantedSIJ');
      }
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
