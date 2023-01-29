import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Kakaopay: React.FC = () => {
  const [seturl, setUrl] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/payment/ready?order_id=2`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response);
        console.log(response.data.tid);
        console.log(response.data.next_redirect_pc_url);
        setUrl(response.data.next_redirect_pc_url);
        console.log(seturl);
      })
      .catch((e) => {
        console.info(e);
      });
  }, []);

  const KakaoRedirect = () => {
    // return <Link to=""></Link>;
    // navigate(`${seturl}`, { replace: true });
    // <Link to={seturl} />;
  };
  return (
    <>
      <Link to={seturl} />
      {/* <button onClick={KakaoRedirect}>결제하기</button> */}
    </>
  );
};
export default Kakaopay;
// headers: {
//   // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
//   Authorization: 'KakaoAK fa319a5e8419561b15b0743226918d02',
//   'Content-type': 'application/x-www-form-urlencoded',
// },

// const state = {
//   next_redirect_pc_url: '',
//   tid: '',
//   params: {
//     cid: 'TC0ONETIME',
//     partner_order_id: 'partner_order_id',
//     partner_user_id: 'partner_user_id',
//     item_name: '초코파이',
//     quantity: 1,
//     total_amount: 2200,
//     vat_amount: 200,
//     tax_free_amount: 0,
//     approval_url: 'http://localhost:3000/',
//     fail_url: 'http://localhost:3000/',
//     cancel_url: 'http://localhost:3000/',
//   },
// };

// ${process.env.REACT_APP_BACKEND_URL}/payment/ready?order_id=1
// console.log(state);
//return <>{/* <a href={next_redirect_pc_url}>{next_redirect_pc_url}</a> */}</>;
// useEffect(() => {
//   fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/ready?order_id=1`, {
//     body: JSON.stringify(params),
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `KakaoAK fa319a5e8419561b15b0743226918d02`,
//     },
//     method: 'POST',
//   }).then((response) => console.log(response));
// }, []);
