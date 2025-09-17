"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  // Hide nav on landing, login, and signup pages
  if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b shadow-sm z-50">
      <div className="container mx-auto flex h-full max-w-3xl items-center justify-between px-4">
        <Link href="/home">
            <Logo />
        </Link>
        <div className="flex items-center gap-4">
          {loading ? (
             <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10">
                  <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
                  <AvatarFallback>
                    {user.displayName
                      ? user.displayName.charAt(0).toUpperCase()
                      : <User />}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                   <Link href="/my-issues">My Problems</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
