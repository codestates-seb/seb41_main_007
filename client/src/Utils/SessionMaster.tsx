// import { useSession } from 'CustomHook/useSession';
// import Empty from 'Components/Common/Empty';
// import PaymentPage from 'Pages/PaymentPage';

// export const PaymentPageSession = () => {
//   const { loading, session } = useSession();
//   if (loading) return <Empty />;
//   return <PaymentPage session={session} />;
// };

// export const MyPageSession = () => {
//   const { loading, session } = useSession();
//   if (loading) return <Empty />;
//   return <Mypage session={session} />;
// };

export const session = localStorage.getItem('access_token');
// export const refreshToken = localStorage.getItem("refreshToken");
// export const memberId = localStorage.getItem("memberId");
// export const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");
