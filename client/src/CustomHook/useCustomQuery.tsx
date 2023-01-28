import { useQuery } from 'react-query';
interface OutPut {
  data: any;
  isLoading: boolean;
  error: string | null | unknown;
  status: string;
  refetch: () => void;
}

export const useCustomQuery = (
  url: string,
  queryKey: any,
  session?: any,
): OutPut => {
  const { data, isLoading, error, status, refetch } = useQuery(
    queryKey,
    () => {
      if (session) {
        console.log('안녕');
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session}`,
          },
        }).then((res: Response) => {
          return res.json();
        });
      } else {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }).then((res: Response) => {
          return res.json();
        });
      }
    },
    { onError: (error) => console.error(error), keepPreviousData: true },
  );

  return { data, isLoading, error, status, refetch };
};
