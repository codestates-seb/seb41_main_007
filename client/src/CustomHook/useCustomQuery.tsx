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
  token?: any,
): OutPut => {
  const { data, isLoading, error, status, refetch } = useQuery(
    queryKey,
    async () => {
      if (token) {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res: Response) => {
            return res.json();
          })
          .catch((e) => {
            return e;
          });
      } else {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
          .then((res: Response) => {
            return res.json();
          })
          .catch((e) => {
            return e;
          });
      }
    },
    { onError: (error) => console.error(error), keepPreviousData: true },
  );

  return { data, isLoading, error, status, refetch };
};
