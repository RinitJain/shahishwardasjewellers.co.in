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
import { signupUser } from '@/lib/authActions'; // Server Action
import { Logo } from '@/components/Logo';

const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).optional().or(z.literal('')),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupFormData) {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) { // Ensure optional fields are handled
         formData.append(key, value as string);
      }
    });

    const result = await signupUser(formData);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Account Created!",
        description: "You have successfully signed up.",
      });
      router.push('/'); // Redirect to homepage or dashboard after signup
    } else {
      if (result.errors) {
        // Handle validation errors from server action if any (though client-side should catch most)
        Object.entries(result.errors).forEach(([field, errors]) => {
          form.setError(field as keyof SignupFormData, { message: (errors as string[])[0] });
        });
      } else {
         toast({
            title: "Signup Failed",
            description: result.error || "An unexpected error occurred.",
            variant: "destructive",
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
        <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
        <CardDescription>Enter your details to join Shah Ishwardas Jewellers.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" {...form.register("username")} placeholder="Your Name" disabled={isLoading} />
            {form.formState.errors.username && <p className="text-xs text-destructive">{form.formState.errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="you@example.com" disabled={isLoading} />
            {form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
            <Input id="phoneNumber" type="tel" {...form.register("phoneNumber")} placeholder="Your phone number" disabled={isLoading} />
            {form.formState.errors.phoneNumber && <p className="text-xs text-destructive">{form.formState.errors.phoneNumber.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} placeholder="••••••••" disabled={isLoading} />
            {form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>.
        </p>
        <p className="text-sm">
          Already have an account? <Link href="/login" className="font-medium text-primary hover:underline">Log In</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
