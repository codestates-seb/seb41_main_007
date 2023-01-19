import { useMutation, useQueryClient } from 'react-query';

export const useCustomMutation = (
  url: string,
  queryKey: string,
  method: string,
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (suggest: any) => {
      return fetch(`${url}`, {
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
};
