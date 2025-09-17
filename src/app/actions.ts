
'use server';

import { suggestIssueTags, type SuggestIssueTagsInput } from '@/ai/flows/suggest-issue-tags';
import { db } from '@/lib/firebase';
import type { Issue } from '@/lib/types';
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, deleteDoc, getDocs, query, orderBy, where, getDoc } from 'firebase/firestore';

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
                { status: 'Submitted', date: new Date().toISOString(), description: `Reported by ${issueData.isAnonymous ? 'Anonymous' : issueData.author}.` }
            ]
        });
        // Note: For production, you would upload the mediaDataUri to a storage bucket
        // and save the URL instead of the large data URI in Firestore.
        // For this example, we proceed with the data URI.
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting issue:', error);
        return { success: false, error: 'Failed to submit issue to the database.' };
    }
}

export async function upvoteIssue(issueId: string, isUpvoted: boolean) {
    try {
        const issueRef = doc(db, 'issues', issueId);
        await updateDoc(issueRef, {
            upvotes: increment(isUpvoted ? -1 : 1)
        });
        const updatedDoc = await getDoc(issueRef);
        const newUpvotes = updatedDoc.data()?.upvotes;
        return { success: true, newUpvotes: newUpvotes };
    } catch (error) {
        console.error('Error upvoting issue:', error);
        return { success: false, error: 'Failed to update upvote count.' };
    }
}


export async function deleteIssue(issueId: string) {
    try {
        await deleteDoc(doc(db, 'issues', issueId));
        return { success: true };
    } catch (error) {
        console.error('Error deleting issue:', error);
        return { success: false, error: 'Failed to delete issue.' };
    }
}
