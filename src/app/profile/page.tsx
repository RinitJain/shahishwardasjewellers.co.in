"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { currentUser, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);
  
  if (loading || !currentUser || !userProfile) {
    return <div className="container mx-auto py-12 text-center"><p>Loading profile...</p></div>;
  }

  const userInitial = userProfile.username ? userProfile.username.charAt(0).toUpperCase() : (userProfile.email ? userProfile.email.charAt(0).toUpperCase() : 'U');

  return (
    <div className="container mx-auto max-w-2xl py-8 md:py-12 px-4">
      <h1 className="font-headline text-3xl text-primary mb-8 text-center">My Profile</h1>
      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 text-3xl bg-primary text-primary-foreground">
            {/* <AvatarImage src={userProfile.avatarUrl} /> */}
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl">{userProfile.username || "User"}</CardTitle>
          <CardDescription>{userProfile.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <form className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={userProfile.username || ""} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={userProfile.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" defaultValue={userProfile.phoneNumber || ""} disabled />
            </div>
            <Button type="button" variant="outline" className="w-full" disabled>Edit Profile (Not implemented)</Button>
          </form>
          <Separator />
           <div>
            <h3 className="font-headline text-lg text-foreground mb-2">Account Settings</h3>
            <Button variant="link" className="p-0 h-auto text-primary hover:underline" disabled>Change Password (Not implemented)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
