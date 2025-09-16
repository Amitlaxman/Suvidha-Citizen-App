import type { Issue, IssueStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CircleDot, FileText, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

type MyIssueItemProps = {
  issue: Issue;
};

const statusIcons: Record<IssueStatus, React.ElementType> = {
    Submitted: FileText,
    Acknowledged: CircleDot,
    'In Progress': Wrench,
    Resolved: CheckCircle2,
};

const statusColors: Record<IssueStatus, string> = {
    Submitted: "text-gray-500",
    Acknowledged: "text-blue-500",
    'In Progress': "text-yellow-500",
    Resolved: "text-green-500",
};

export function MyIssueItem({ issue }: MyIssueItemProps) {
  const currentStatusIndex = issue.updates.findIndex(update => update.status === issue.status);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start gap-2 mb-2">
            <Badge variant="secondary">{issue.category}</Badge>
            <Badge variant="outline" className="font-mono">ID: {issue.id}</Badge>
        </div>
        <CardTitle className="text-lg font-headline">{issue.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6 text-sm">{issue.description}</p>
        
        <h4 className="font-semibold mb-3">Status Timeline</h4>
        <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-2 h-full w-0.5 bg-border -z-10" />

            {issue.updates.map((update, index) => {
                const Icon = statusIcons[update.status];
                const isCompleted = index <= currentStatusIndex;
                
                return (
                    <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                         <div className={cn(
                             "flex h-8 w-8 items-center justify-center rounded-full bg-background border-2",
                             isCompleted ? "border-primary" : "border-border"
                         )}>
                             <Icon className={cn("h-4 w-4", isCompleted ? "text-primary" : "text-muted-foreground")} />
                         </div>
                        <div className="pt-1">
                            <p className={cn(
                                "font-semibold",
                                isCompleted ? "text-foreground" : "text-muted-foreground"
                            )}>{update.status}</p>
                            <p className={cn(
                                "text-sm",
                                isCompleted ? "text-muted-foreground" : "text-muted-foreground/70"
                            )}>
                                {isCompleted ? update.description : `Updated on ${update.date}`}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
