// import { Cookies } from 'react-cookie';
// const cookies = new Cookies();
// const accessToken = cookies.get('Authorization');
interface useCreateProps {
  url: string;
  id: any;
  data: string;
}
export const reviewCreate = ({ url, id, data }: useCreateProps) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.href = `/api/questions/${id}`;
    })
    .catch((error) => {
      console.error('Error', error);
    });
};

export const reviewDelete = ({ url, id }: useCreateProps) => {
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      window.location.href = `/api/questions/${id}`;
    })
    .catch((error) => {
      console.error('Error', error);
    });
};

export const reviewPatch = ({ url, data }: useCreateProps) => {
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => {
      window.location.href = `/`;
    })
    .catch((error) => {
      console.error('Error', error);
    });
};
