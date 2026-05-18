import { useEffect, useState } from 'react';
import { Comment } from '../types';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/comments');
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (guestName: string, message: string, guestEmail?: string) => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName, message, guestEmail }),
      });

      if (!response.ok) throw new Error('Failed to add comment');
      
      const newComment = await response.json();
      setComments([newComment, ...comments]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
      return false;
    }
  };

  return { comments, loading, error, addComment, refetch: fetchComments };
}
