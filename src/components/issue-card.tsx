
"use client";

import type { Issue } from "@/lib/types";
import { useState, useTransition } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, MapPin, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { upvoteIssue } from "@/app/actions";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [isUpvoting, startUpvoteTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const displayImage = issue.mediaDataUri || issue.imageUrl;

  const handleUpvote = () => {
    startUpvoteTransition(async () => {
      const result = await upvoteIssue(issue.id, isUpvoted);
      if (result.success) {
        setUpvotes(result.newUpvotes);
        setIsUpvoted(!isUpvoted);
      } else {
        toast({
          variant: "destructive",
          title: "Upvote Failed",
          description: result.error,
        });
      }
    });
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {displayImage && (
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full">
            <Image
              src={displayImage}
              alt={issue.title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
      )}
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
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
            <div className="px-4 pb-4 text-sm text-muted-foreground">
                <p>{issue.description}</p>
            </div>
        </CollapsibleContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
            <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                    Status: <span className="text-primary">{issue.status}</span>
                </div>
                 <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {isOpen ? "Hide Details" : "More Details"}
                    </Button>
                </CollapsibleTrigger>
            </div>
            <Button
            variant={isUpvoted ? "default" : "outline"}
            size="sm"
            onClick={handleUpvote}
            disabled={isUpvoting}
            className="transition-all duration-200"
            >
            {isUpvoting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <ArrowUp className={cn("h-4 w-4 mr-2 transition-transform", isUpvoted && "scale-110")} />
            )}
            <span className="font-bold">{upvotes}</span>
            </Button>
      </CardFooter>
      </Collapsible>
    </Card>
  );
}
