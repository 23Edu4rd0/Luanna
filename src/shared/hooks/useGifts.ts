import { useEffect, useState } from 'react';
import { Gift } from '../types';

export function useGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gifts');
      if (!response.ok) throw new Error('Failed to fetch gifts');
      const data = await response.json();
      setGifts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reserveGift = async (giftId: number, guestName: string, guestEmail?: string) => {
    try {
      const response = await fetch(`/api/gifts/${giftId}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestName, guestEmail }),
      });

      if (!response.ok) throw new Error('Failed to reserve gift');
      
      await response.json();
      await fetchGifts();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reserve gift');
      return false;
    }
  };

  return { gifts, loading, error, reserveGift, refetch: fetchGifts };
}
