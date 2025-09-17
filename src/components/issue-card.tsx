"use client";

import type { Issue } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type IssueCardProps = {
  issue: Issue;
};

const severityColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-800 border-red-200",
};

export function IssueCard({ issue }: IssueCardProps) {
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleUpvote = () => {
    // In a real app, this would be an API call to update the database
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        {issue.imageUrl ? (
            <div className="relative aspect-video w-full">
                <Image
                    src={issue.imageUrl}
                    alt={issue.title}
                    fill
                    className="object-cover"
                />
            </div>
        ) : (
          <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No Image Provided</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
            <Badge variant="secondary">{issue.category}</Badge>
            <Badge className={cn("border", severityColors[issue.severity])}>{issue.severity} Severity</Badge>
        </div>
        <CardTitle className="text-lg font-headline mb-2">{issue.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
          <span>{issue.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
        <div className="text-sm font-medium">
            Status: <span className="text-primary">{issue.status}</span>
        </div>
        <Button
          variant={isUpvoted ? "default" : "outline"}
          size="sm"
          onClick={handleUpvote}
          className="transition-all duration-200"
        >
          <ArrowUp className={cn("h-4 w-4 mr-2 transition-transform", isUpvoted && "scale-110")} />
          <span className="font-bold">{upvotes}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
