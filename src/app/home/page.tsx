"use client";

import { useState } from "react";
import { issues } from "@/lib/data";
import { IssueCard } from "@/components/issue-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { List, Map } from "lucide-react";

export default function HomePage() {
  const [view, setView] = useState("list"); // 'list' or 'map'

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <div className="my-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="severity">Most Severe</SelectItem>
              <SelectItem value="upvotes">Most Upvoted</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="unresolved">Unresolved</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-grow" />
          <div className="flex items-center gap-2 rounded-md bg-muted p-1">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              className="w-full"
              onClick={() => setView("list")}
            >
              <List className="mr-2 h-4 w-4" />
              List
            </Button>
            <Button
              variant={view === "map" ? "secondary" : "ghost"}
              size="sm"
              className="w-full"
              onClick={() => setView("map")}
            >
              <Map className="mr-2 h-4 w-4" />
              Map
            </Button>
          </div>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed bg-card flex flex-col items-center justify-center text-center text-muted-foreground shadow-inner">
           <Map className="h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold">Map View</h3>
          <p className="text-sm">Interactive map feature is coming soon.</p>
        </div>
      )}
    </div>
  );
}
