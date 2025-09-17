
'use server';

import { suggestIssueTags, type SuggestIssueTagsInput } from '@/ai/flows/suggest-issue-tags';
import { db } from '@/lib/firebase';
import type { Issue } from '@/lib/types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function getTagSuggestions(input: SuggestIssueTagsInput) {
  try {
    const result = await suggestIssueTags(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error getting tag suggestions:', error);
    return { success: false, error: 'Failed to get AI suggestions. Please categorize manually.' };
  }
}

export async function submitIssue(issueData: Omit<Issue, 'id' | 'createdAt' | 'updates' | 'status' | 'upvotes'>) {
    try {
        const docRef = await addDoc(collection(db, 'issues'), {
            ...issueData,
            createdAt: serverTimestamp(),
            status: 'Submitted',
            upvotes: 0,
            updates: [
                { status: 'Submitted', date: new Date().toISOString().split('T')[0], description: `Reported by ${issueData.isAnonymous ? 'Anonymous' : issueData.author}.` }
            ]
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting issue:', error);
        return { success: false, error: 'Failed to submit issue to the database.' };
    }
}
