"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Issue } from "@/lib/types";
import { MyIssueItem } from "@/components/my-issue-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/logo";

function MyIssuesSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
        </div>
    );
}

export default function MyIssuesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    setLoadingIssues(true);
    const issuesQuery = query(
      collection(db, "issues"),
      where("authorId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(issuesQuery, (snapshot) => {
      const userIssues = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Issue));
      setIssues(userIssues);
      setLoadingIssues(false);
    }, (error) => {
        console.error("Error fetching user issues:", error);
        setLoadingIssues(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-3xl font-bold font-headline mb-6">My Problems</h1>
        <MyIssuesSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
       <header className="flex items-center justify-between mb-6">
        <Logo />
      </header>
      <h1 className="text-3xl font-bold font-headline mb-6">My Problems</h1>

      {loadingIssues ? (
        <MyIssuesSkeleton />
      ) : issues.length > 0 ? (
        <div className="space-y-6">
          {issues.map((issue) => (
            <MyIssueItem key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">You haven't reported any issues yet.</p>
          <Button asChild className="mt-4">
            <Link href="/report">Report Your First Issue</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
