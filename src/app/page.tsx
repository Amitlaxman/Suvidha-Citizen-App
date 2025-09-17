"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 leading-tight">
                Suvidha
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Smart Utility for Voicing Issues, Demands, Help and Assistance.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/home">Get Started</Link>
              </Button>
            </div>
            <div>
              <Image
                src="https://picsum.photos/seed/community/600/400"
                alt="Community illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="community people"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
