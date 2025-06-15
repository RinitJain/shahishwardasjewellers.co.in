"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from '@/lib/authActions'; // Server Action
import { Logo } from '@/components/Logo';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await loginUser(formData);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Login Successful!",
        description: "Welcome back to Shah Ishwardas Jewellers.",
      });
      router.push('/'); // Redirect to homepage or dashboard after login
    } else {
      toast({
        title: "Login Failed",
        description: result.error || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
       if (result.errors) {
        Object.entries(result.errors).forEach(([field, errors]) => {
          form.setError(field as keyof LoginFormData, { message: (errors as string[])[0] });
        });
      }
    }
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
         <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
        <CardDescription>Log in to your Shah Ishwardas Jewellers account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="you@example.com" disabled={isLoading} />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} placeholder="••••••••" disabled={isLoading} />
            {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
            </div> */}
            <Link href="/forgot-password" passHref legacyBehavior>
              <a className="text-sm text-primary hover:underline">Forgot password?</a>
            </Link>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Logging In..." : "Log In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center">
        <p className="text-sm w-full">
          Don't have an account? <Link href="/signup" className="font-medium text-primary hover:underline">Sign Up</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
