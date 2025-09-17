
"use client";

import { useTranslation } from "@/hooks/use-translation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-2">
       <Languages className="h-5 w-5 text-muted-foreground" />
       <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'hi')}>
        <SelectTrigger className="w-[120px] h-9">
            <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">हिन्दी</SelectItem>
        </SelectContent>
        </Select>
    </div>
  );
}
