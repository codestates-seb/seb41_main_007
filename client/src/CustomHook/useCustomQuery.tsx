import { useQuery } from 'react-query';
interface OutPut {
  data: any;
  isLoading: boolean;
  error: string | null | unknown;
  status: string;
  refetch: () => void;
}

export const useCustomQuery = (url: string, queryKey: any): OutPut => {
  const { data, isLoading, error, status, refetch } = useQuery(
    queryKey,
    () =>
      fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res: Response) => {
        return res.json();
      }),
    { keepPreviousData: true },
  );

  return { data, isLoading, error, status, refetch };
};
