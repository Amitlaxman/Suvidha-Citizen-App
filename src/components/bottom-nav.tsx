"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusSquare, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home Feed", icon: Home },
  { href: "/report", label: "Report Issue", icon: PlusSquare },
  { href: "/my-issues", label: "My Problems", icon: ClipboardList },
];

export function BottomNav() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card border-t shadow-t-lg z-50">
      <div className="container mx-auto flex h-full max-w-3xl items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-primary",
                isActive && "text-primary"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
