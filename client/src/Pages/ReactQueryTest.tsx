import { useCustomMutation } from 'CustomHook/useCustomMutaiton';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC, useState } from 'react';

const ReactQueryTest: FC = () => {
  const [text, setText] = useState<string>('');
  const { data, isLoading, error } = useCustomQuery('/products', 'products');

  const { mutate } = useCustomMutation('/products', 'products', 'POST');

  if (isLoading) return <></>;
  if (error) return <div> error</div>;
  return (
    <div>
      {data &&
        data.data.map((el: { productId: number; name: string }) => {
          return <div key={el.productId}> {el.name}</div>;
        })}
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="입력해주세요"
      />
      <button
        onClick={() => {
          mutate({
            name: '아테네',
            price: 2000000,
            photo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/First_Tractor_Company_-_old_working_model_-_01.jpg/220px-First_Tractor_Company_-_old_working_model_-_01.jpg',
            brand: '순양자동차',
            description: '진양철이 개발한 차량입니다.',
            shippingCountry: 'KOREA',
            shippingMethod: 'PARCEL_SERVICE',
            shippingPrice: 30000,
            productCategoryPostDtos: [
              {
                categoryId: 1,
              },
            ],
            productOptionPostDtos: [
              {
                productOptionName: '자폭',
                price: 1000000,
                stock: 10,
              },
              {
                productOptionName: '본네트를 없애서 경량화',
                price: 1000000,
                stock: 10,
              },
            ],
          });
        }}
      >
        클릭시 변경
      </button>
    </div>
  );
};

export default ReactQueryTest;
