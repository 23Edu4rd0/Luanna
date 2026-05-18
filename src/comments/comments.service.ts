import { Comment } from '../shared/types';

export async function getComments(): Promise<Comment[]> {
  // This will be replaced with actual database queries
  return [];
}

export async function createComment(
  guestName: string,
  message: string,
  guestEmail?: string
): Promise<Comment | null> {
  // This will be replaced with actual database operations
  return null;
}

export function isValidMessage(message: string): boolean {
  return message.trim().length > 0 && message.trim().length <= 500;
}

export function isValidName(name: string): boolean {
  return name.trim().length > 0 && name.trim().length <= 100;
}
