// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();
// const accessToken = cookies.get('Authorization');
interface useCreateProps {
  url: string;
  id: any;
  data: any;
}

export const pictureCreate = (url: string, data: any) => {
  const formData = new FormData();
  formData.append('file', data);
  return fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
    cache: 'no-cache',
    body: formData,
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
