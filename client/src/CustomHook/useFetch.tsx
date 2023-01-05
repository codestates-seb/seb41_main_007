import { useState, useEffect } from 'react';

interface TApiResponse {
  data: any;
  isPending: boolean;
  error: string | null;
}

interface useFetchProps {
  url: string;
}
export const useFetch = ({ url }: useFetchProps): TApiResponse => {
  const [data, setData] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setData(data);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 150);

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};