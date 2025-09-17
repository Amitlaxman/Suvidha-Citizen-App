import { Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Megaphone className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold font-headline text-foreground">
        Suvidha
      </span>
    </div>
  );
}
