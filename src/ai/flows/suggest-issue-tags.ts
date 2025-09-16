'use server';

/**
 * @fileOverview An AI agent that suggests relevant category and severity tags for an issue report.
 *
 * - suggestIssueTags - A function that suggests category and severity tags for an issue report.
 * - SuggestIssueTagsInput - The input type for the suggestIssueTags function.
 * - SuggestIssueTagsOutput - The return type for the suggestIssueTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestIssueTagsInputSchema = z.object({
  title: z.string().describe('The title of the issue report.'),
  description: z.string().describe('The description of the issue report.'),
  mediaDataUri: z
    .string()
    .optional()
    .describe(
      "A photo or video related to the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestIssueTagsInput = z.infer<typeof SuggestIssueTagsInputSchema>;

const SuggestIssueTagsOutputSchema = z.object({
  category: z.string().describe('The suggested category for the issue.'),
  severity: z.string().describe('The suggested severity for the issue (e.g., Low, Medium, High).'),
});
export type SuggestIssueTagsOutput = z.infer<typeof SuggestIssueTagsOutputSchema>;

export async function suggestIssueTags(input: SuggestIssueTagsInput): Promise<SuggestIssueTagsOutput> {
  return suggestIssueTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestIssueTagsPrompt',
  input: {schema: SuggestIssueTagsInputSchema},
  output: {schema: SuggestIssueTagsOutputSchema},
  prompt: `You are an AI assistant helping to categorize issue reports.

  Based on the following information, suggest a category and severity for the issue.

  Title: {{{title}}}
  Description: {{{description}}}
  {{#if mediaDataUri}}
  Media: {{media url=mediaDataUri}}
  {{/if}}

  Please provide the category and severity in the output. The severity should be one of: Low, Medium, High.
`,
});

const suggestIssueTagsFlow = ai.defineFlow(
  {
    name: 'suggestIssueTagsFlow',
    inputSchema: SuggestIssueTagsInputSchema,
    outputSchema: SuggestIssueTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
