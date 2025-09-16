
'use server';

import { suggestIssueTags, type SuggestIssueTagsInput } from '@/ai/flows/suggest-issue-tags';

export async function getTagSuggestions(input: SuggestIssueTagsInput) {
  try {
    const result = await suggestIssueTags(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting tag suggestions:', error);
    return { success: false, error: 'Failed to get AI suggestions. Please categorize manually.' };
  }
}
