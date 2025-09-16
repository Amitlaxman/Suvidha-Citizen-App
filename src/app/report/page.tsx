import { IssueForm } from "@/components/issue-form";
import { Logo } from "@/components/logo";

export default function ReportIssuePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
       <header className="flex items-center justify-between mb-6">
        <Logo />
      </header>
      <h1 className="text-3xl font-bold font-headline mb-2">Report a New Issue</h1>
      <p className="text-muted-foreground mb-6">
        Fill out the details below to report a civic issue. Your contribution helps improve our community.
      </p>
      <IssueForm />
    </div>
  );
}
