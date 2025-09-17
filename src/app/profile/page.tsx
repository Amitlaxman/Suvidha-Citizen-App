"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Issue } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MyIssueItem } from "@/components/my-issue-item";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail } from "lucide-react";


function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-col items-center text-center">
                     <Skeleton className="h-24 w-24 rounded-full mb-4" />
                     <Skeleton className="h-6 w-40 mb-2" />
                     <Skeleton className="h-4 w-48" />
                </CardHeader>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>My Reported Issues</CardTitle>
                </CardHeader>
                <CardContent>
                     <Skeleton className="h-20 w-full mb-4" />
                     <Skeleton className="h-20 w-full" />
                </CardContent>
            </Card>
        </div>
    )
}


export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
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
        <div className="container mx-auto max-w-3xl px-4 py-10">
            <ProfileSkeleton />
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="mb-8">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 text-4xl">
            <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
            <AvatarFallback>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.displayName || "User"}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <Button onClick={logout} variant="ghost" className="mt-4">
            Logout
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>My Reported Issues</CardTitle>
        </CardHeader>
        <CardContent>
            {loadingIssues ? (
                <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            ) : issues.length > 0 ? (
                <div className="space-y-6">
                {issues.map((issue) => (
                    <MyIssueItem key={issue.id} issue={issue} />
                ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">You haven&apos;t reported any issues yet.</p>
                     <Button asChild className="mt-4">
                        <a href="/report">Report Your First Issue</a>
                    </Button>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
