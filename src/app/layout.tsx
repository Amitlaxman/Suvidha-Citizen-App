import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { BottomNav } from "@/components/bottom-nav";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/hooks/use-auth";
import "./globals.css";


export const metadata: Metadata = {
  title: "Suvidha",
  description: "Report and track civic issues in your area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background">
        <AuthProvider>
          <div className="relative flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex-1 pt-16 pb-24">{children}</main>
            <BottomNav />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
