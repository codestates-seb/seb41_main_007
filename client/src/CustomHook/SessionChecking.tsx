import { useSession } from 'CustomHook/useSession';
import { useNavigate } from 'react-router-dom';
import Empty from 'Components/Common/Empty';

const SessionChecking = (): JSX.Element | void => {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  if (loading) return <Empty />;
  if (!session) {
    navigate('/');
  }
};

export default SessionChecking;
