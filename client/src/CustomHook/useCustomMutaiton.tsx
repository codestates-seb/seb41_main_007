import { useMutation, useQueryClient } from 'react-query';

export const useCustomMutation = (
  url: string,
  queryKey: string,
  method: string,
) => {
  const host = 'http://farmandpeople.kro.kr:8080';
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (suggest: any) => {
      return fetch(`${host}${url}`, {
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
