import { useSession } from 'CustomHook/useSession';
import Empty from 'Components/Common/Empty';
import PaymentPage from 'Pages/PaymentPage';
import Mypage from 'Pages/MyPage';

export const PaymentPageSession = () => {
  const { loading, session } = useSession();
  if (loading) return <Empty />;
  return <PaymentPage session={session} />;
};

export const MyPageSession = () => {
  const { loading, session } = useSession();
  if (loading) return <Empty />;
  return <Mypage session={session} />;
};
