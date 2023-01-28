import { useSession } from 'CustomHook/useSession';

import Empty from 'Components/Common/Empty';

const SessionChecking = (): JSX.Element | void => {
  const { session, loading } = useSession();

  if (loading) return <Empty />;
  if (!session) {
    window.location.href = '/';
  }
};

export default SessionChecking;
