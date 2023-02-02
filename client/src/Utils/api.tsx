interface useCreateProps {
  url: string;
  id: any;
  data: any;
}

export const pictureCreate = (url: string, data: any) => {
  const formData = new FormData();
  formData.append('file', data);
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
    cache: 'no-cache',
    body: formData,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
  })
    .then((res: Response) => {
      return res.json();
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};
