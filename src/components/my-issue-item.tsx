
import type { Issue, IssueStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CircleDot, FileText, Wrench, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteIssue } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type MyIssueItemProps = {
  issue: Issue;
};

const statusIcons: Record<IssueStatus, React.ElementType> = {
    Submitted: FileText,
    Acknowledged: CircleDot,
    'In Progress': Wrench,
    Resolved: CheckCircle2,
};

export function MyIssueItem({ issue }: MyIssueItemProps) {
  const { toast } = useToast();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const currentStatusIndex = issue.updates.findIndex(update => update.status === issue.status);

  const handleDelete = () => {
    startDeleteTransition(async () => {
        const result = await deleteIssue(issue.id);
        if (result.success) {
            toast({ title: "Issue Deleted", description: "Your issue report has been successfully deleted." });
            setIsAlertOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Deletion Failed",
                description: result.error
            });
            setIsAlertOpen(false);
        }
    });
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start gap-2 mb-2">
            <Badge variant="secondary">{issue.category}</Badge>
            <Badge variant="outline" className="font-mono text-xs">ID: {issue.id.substring(0, 8).toUpperCase()}</Badge>
        </div>
        <CardTitle className="text-lg font-headline">{issue.title}</CardTitle>
      </CardHeader>
      <CardContent>
        
        <h4 className="font-semibold mb-4 text-sm text-muted-foreground">Status Timeline</h4>
        <div className="relative pl-4">
            {/* Timeline Line */}
            <div className="absolute left-8 top-2 h-full w-0.5 bg-border -z-10" />

            {issue.updates.map((update, index) => {
                const Icon = statusIcons[update.status] || AlertTriangle;
                const isCurrent = issue.status === update.status;
                
                return (
                    <div key={index} className="flex items-start gap-4 mb-6 last:mb-0">
                         <div className={cn(
                             "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background",
                             isCurrent ? "border-primary" : "border-border"
                         )}>
                             <Icon className={cn("h-4 w-4", isCurrent ? "text-primary" : "text-muted-foreground")} />
                         </div>
                        <div className="pt-1">
                            <div className={cn(
                                "font-semibold flex items-center",
                                isCurrent ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {update.status}
                                {isCurrent && <Badge variant="outline" className="ml-2 text-primary border-primary">Current</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {new Date(update.date).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                            </p>
                             <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-3 flex justify-end">
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your issue
                        report from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                         {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Continue
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
      </CardFooter>
    </Card>
  );
}
