import { useState, useEffect } from 'react';

interface ApiResponseOutPut {
  data: any;
  isPending: boolean;
  error: string | null;
}

interface useFetchProps {
  url: string;
}
export const useFetch = ({ url }: useFetchProps): ApiResponseOutPut => {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          console.log(res.status);
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

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};
