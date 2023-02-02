import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { initialize, pageview } from 'react-ga';

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      initialize(process.env.REACT_APP_GOOGLE_ANALYTICS as string);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
