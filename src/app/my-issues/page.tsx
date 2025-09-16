import { issues } from "@/lib/data";
import { MyIssueItem } from "@/components/my-issue-item";
import { Logo } from "@/components/logo";

// In a real app, you would fetch issues for the currently logged-in user.
const mySubmittedIssues = issues.slice(0, 2); 

export default function MyIssuesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <Logo />
      </header>
      <h1 className="text-3xl font-bold font-headline mb-2">Track My Problems</h1>
      <p className="text-muted-foreground mb-6">Here are the issues you've reported. Track their progress below.</p>
      
      {mySubmittedIssues.length > 0 ? (
        <div className="space-y-6">
          {mySubmittedIssues.map((issue) => (
            <MyIssueItem key={issue.id} issue={issue} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven&apos;t reported any issues yet.</p>
        </div>
      )}
    </div>
  );
}
