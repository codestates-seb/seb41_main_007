import { useQuery } from 'react-query';
interface OutPut {
  data: any;
  isLoading: boolean;
  error: string | null | unknown;
  status: string;
}

export const useCustomQuery = (url: string, queryKey: string): OutPut => {
  const { data, isLoading, error, status } = useQuery(queryKey, () =>
    fetch(`${url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res: Response) => {
      return res.json();
    }),
  );

  return { data, isLoading, error, status };
};
