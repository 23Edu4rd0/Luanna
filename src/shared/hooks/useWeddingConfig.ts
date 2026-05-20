import { useEffect, useState } from 'react';

interface WeddingConfig {
  coupleNames: string;
  weddingDate: string;
}

const DEFAULT_CONFIG: WeddingConfig = {
  coupleNames: 'Casal Feliz',
  weddingDate: '2026-10-25',
};

export function useWeddingConfig() {
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Failed to fetch wedding config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
}
