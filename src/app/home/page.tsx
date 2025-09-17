"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Issue } from "@/lib/types";
import { IssueCard } from "@/components/issue-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { List, Map } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function IssueSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [view, setView] = useState("list");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user) return;

    const issuesCollection = collection(db, "issues");
    const q = query(issuesCollection, orderBy("createdAt", "desc"));
    
    setLoading(true);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const issuesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Issue));
      setIssues(issuesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching issues:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredAndSortedIssues = useMemo(() => {
    let processedIssues = issues;

    // Filter based on search query
    if (searchQuery) {
        processedIssues = processedIssues.filter(issue => 
            issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            issue.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Sort based on selected option
    switch (sortOption) {
      case "newest":
        // Already sorted by newest by default from Firestore query
        break;
      case "severity":
        const severityOrder = { High: 3, Medium: 2, Low: 1 };
        processedIssues.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity]);
        break;
      case "upvotes":
        processedIssues.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "resolved":
        processedIssues = processedIssues.filter(issue => issue.status === "Resolved");
        break;
      case "unresolved":
        processedIssues = processedIssues.filter(issue => issue.status !== "Resolved");
        break;
    }
    
    return processedIssues;
  }, [issues, searchQuery, sortOption]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
       <div className="my-6 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search issues by title or description..." 
                    className="pl-10 w-full" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Select value={sortOption} onValueChange={setSortOption}>
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
          {loading ? (
             <>
              <IssueSkeleton />
              <IssueSkeleton />
             </>
          ) : filteredAndSortedIssues.length > 0 ? (
             filteredAndSortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">{searchQuery ? "No issues match your search." : "No issues reported yet. Be the first!"}</p>
            </div>
          )}
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
