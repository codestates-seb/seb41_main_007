import { compressImage } from './commpressImage';

export const pictureCreate = async (url: string, data: any) => {
  const res = await compressImage(data);
  const formData = new FormData();
  formData.append('file', res);
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
    cache: 'no-cache',
    body: formData,
    headers: {
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
