import { createContext, useContext, useState, useEffect } from 'react';

// const fetcher = async (token: string) => {
//   const url = 'http://localhost:4000/auth/validToken';
//   try {
//     const urlOptions = {
//       method: 'POST',
//       headers: {
//         Authorization: token,
//       },
//     };
//     const res = await fetch(url, urlOptions);
//     const data = await res.json();
//     return [null, data];
//   } catch (error) {
//     return [error, null];
//   }
// };

export type Session = {
  session: any | null | boolean;
  loading: boolean;
};

const INITIAL = {
  session: null,
  loading: true,
};

export const SessionContext = createContext(INITIAL as Session);

export function useSession() {
  return useContext(SessionContext);
}

export const SessionProvider = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setSession(true);
      setLoading(false);
      //   fetcher(token)
      //     .then((data) => {
      //       setSession(data[1]);
      //       setLoading(false);
      //     })
      //     .catch((e) => {
      //       setSession(null);
      //       setLoading(false);
      //     });
    } else {
      setSession(false);
      setLoading(false);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
