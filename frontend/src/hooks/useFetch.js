import { useEffect, useState } from 'react';

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetcher()
      .then((response) => mounted && setData(response.data.data || []))
      .catch((err) => mounted && setError(err.response?.data?.message || 'Failed to load'))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading, error };
}
