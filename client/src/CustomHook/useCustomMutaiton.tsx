import { useMutation, useQueryClient } from 'react-query';

export const useCustomMutation = (
  url: string,
  queryKey: any,
  method: string,
  token?: string | null,
) => {
  const queryClient = useQueryClient();
  if (token) {
    const myHeaders = new Headers();
    // myHeaders.append();
    const { mutate } = useMutation(
      (suggest: any) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          body: JSON.stringify(suggest),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: method,
        });
      },
      {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
      },
    );
    return { mutate };
  } else {
    const { mutate } = useMutation(
      (suggest: any) => {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
          body: JSON.stringify(suggest),
          headers: { 'Content-Type': 'application/json' },
          method: method,
        });
      },
      {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
      },
    );
    return { mutate };
  }
};
