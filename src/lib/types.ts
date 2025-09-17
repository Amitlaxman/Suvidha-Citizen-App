import type { Timestamp } from 'firebase/firestore';

export type IssueStatus = 'Submitted' | 'Acknowledged' | 'In Progress' | 'Resolved';
export type IssueSeverity = 'Low' | 'Medium' | 'High';
export type IssueCategory = 'Roads' | 'Water Supply' | 'Electricity' | 'Waste Management' | 'Public Transport' | 'Other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  severity: IssueSeverity;
  location: string;
  imageUrl?: string;
  upvotes: number;
  status: IssueStatus;
  isAnonymous: boolean;
  author: string;
  authorId: string;
  createdAt: Timestamp | string; // Firestore timestamp or string for client-side
  updates: { status: IssueStatus; date: string; description: string }[];
}
