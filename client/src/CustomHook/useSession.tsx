import { createContext, useContext, useState, useEffect } from 'react';

export type Session = {
  session: string | null;
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
      setSession(token);
      setLoading(false);
    } else {
      setSession(null);
      setLoading(false);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
