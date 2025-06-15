"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { User as UserIcon, LogOut, Settings, ShoppingBag, LayoutDashboard } from 'lucide-react'; // Added ShoppingBag

export function UserNav() {
  const { currentUser, userProfile, isAdmin } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/'); // Redirect to home page after logout
  };

  if (!currentUser) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }

  const userInitial = userProfile?.username ? userProfile.username.charAt(0).toUpperCase() : (userProfile?.email ? userProfile.email.charAt(0).toUpperCase() : 'U');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {/* Placeholder for user avatar image if available */}
            {/* <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.username || "User Avatar"} /> */}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userProfile?.username || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             {/* This should go to order history or similar user-specific page */}
            <Link href="/orders" className="cursor-pointer"> 
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
             <DropdownMenuItem asChild>
                <Link href="/admin/dashboard" className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
