export interface Feedback {
    feedbackId: string;
    fullName: string;
    rating: number;
    comments: string;
    date: string;
    status: string;
    isApproved: boolean;
}

export interface Account {
    id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
    lastActiveAt: string;
    totalActiveDays: number;
    
  }