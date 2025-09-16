"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { getTagSuggestions } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wand2, MapPin, Loader2, Paperclip } from "lucide-react";

const issueFormSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  category: z.enum(["Roads", "Water Supply", "Electricity", "Waste Management", "Public Transport", "Other"]),
  severity: z.enum(["Low", "Medium", "High"]),
  location: z.string().min(2, { message: "Location is required." }),
  media: z.any().optional(),
  isAnonymous: z.boolean().default(false),
});

type IssueFormValues = z.infer<typeof issueFormSchema>;

const defaultValues: Partial<IssueFormValues> = {
  isAnonymous: false,
};

export function IssueForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<IssueFormValues>({
    resolver: zodResolver(issueFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: IssueFormValues) {
    console.log(data);
    toast({
      title: "Issue Submitted!",
      description: "Thank you for your report. Your Problem ID is #12345.",
    });
    form.reset();
  }

  const handleSuggestTags = () => {
    const title = form.getValues("title");
    const description = form.getValues("description");
    if (!title || !description) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Please enter a title and description before using AI suggestions.",
      });
      return;
    }
    startTransition(async () => {
      const result = await getTagSuggestions({ title, description });
      if (result.success && result.data) {
        const { category, severity } = result.data;
        // This is a simple mapping. A real app might need more robust logic.
        const validCategory = issueFormSchema.shape.category.options.find(c => c.toLowerCase() === category.toLowerCase()) || "Other";
        const validSeverity = issueFormSchema.shape.severity.options.find(s => s.toLowerCase() === severity.toLowerCase()) || "Medium";
        form.setValue("category", validCategory as IssueFormValues['category']);
        form.setValue("severity", validSeverity as IssueFormValues['severity']);
        toast({
          title: "Suggestions applied!",
          description: "AI has suggested a category and severity for your issue.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "AI Suggestion Failed",
          description: result.error,
        });
      }
    });
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // In a real app, you'd use a reverse geocoding service.
        const location = `Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`;
        form.setValue("location", location);
        toast({ title: "Location captured successfully!"});
      }, () => {
        toast({ variant: "destructive", title: "Could not get location", description: "Please enable location services or enter manually." });
      });
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Large pothole on Main Street" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief, clear title for the issue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue in detail..."
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                   <FormDescription>
                    Provide as much detail as possible, including landmarks and the impact of the issue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h3 className="text-lg font-semibold">Issue Details</h3>
                   <Button type="button" size="sm" onClick={handleSuggestTags} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Suggest Tags with AI
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Roads">Roads</SelectItem>
                            <SelectItem value="Water Supply">Water Supply</SelectItem>
                            <SelectItem value="Electricity">Electricity</SelectItem>
                            <SelectItem value="Waste Management">Waste Management</SelectItem>
                            <SelectItem value="Public Transport">Public Transport</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                   <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a severity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
            </div>

            <Separator />

             <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location & Media</h3>
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="e.g., Near City Park, Springfield" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" size="icon" onClick={handleGetLocation} aria-label="Get current location">
                            <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="media"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attach Photo/Video</FormLabel>
                      <FormControl>
                         <div className="relative">
                            <Input type="file" className="pl-12" {...field} />
                             <Paperclip className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                      </FormControl>
                       <FormDescription>
                        A picture is worth a thousand words. Attach relevant media.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             </div>
            
            <Separator />
            
             <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">Report Anonymously</FormLabel>
                        <FormDescription>
                        If enabled, your name will not be publicly associated with this report.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
            
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Submit Issue</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
