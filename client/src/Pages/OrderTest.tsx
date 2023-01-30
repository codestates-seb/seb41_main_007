const OrderTest: React.FC = () => {
  const token = localStorage.getItem('access_token');
  console.info(token);
  const onClickhandler = async () => {
    const { data } = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address: '주소',
          name: '시영',
          phone: '010-1111-1111',
          orderProductPostDtos: [
            {
              productOptionId: 1,
              quantity: 1,
            },
          ],
        }),

        method: 'POST',
      },
    )
      .then((response) => response.json())
      .catch((e) => console.info(e));
    console.info(data);
  };

  return (
    <>
      <button onClick={onClickhandler}>이거 누르면</button>
    </>
  );
};
export default OrderTest;
