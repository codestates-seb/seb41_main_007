import { useMutation, useQueryClient } from 'react-query';

export const useCustomMutation = (
  url: string,
  queryKey: any,
  method: string,
  token?: string | null,
  queryNoReset?: boolean,
) => {
  const queryClient = useQueryClient();
  if (token) {
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
        onSuccess: () => {
          queryNoReset ? null : queryClient.invalidateQueries(queryKey);
        },
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
        onSuccess: () => {
          queryNoReset ? null : queryClient.invalidateQueries(queryKey);
        },
      },
    );
    return { mutate };
  }
};
