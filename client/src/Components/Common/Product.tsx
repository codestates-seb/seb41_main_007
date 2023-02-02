import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/Product.module.css';
import { SkeletonContent } from 'Components/Loading/LoadingList';
import { TYPE_Product } from '../../Types/common/product';
import styled from 'styled-components';
import { useNumberComma } from 'Utils/commonFunction';

interface Props {
  product: TYPE_Product;
}

const Product: FC<Props> = ({ product }) => {
  const REF = useRef<HTMLDivElement>(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function loadImage() {
      setIsLoad(true);
    }

    const productEl = REF.current;
    productEl && productEl.addEventListener(LOAD_EVENT_TYPE, loadImage);
    return () => {
      productEl && productEl.removeEventListener(LOAD_EVENT_TYPE, loadImage);
    };
  }, []);

  useEffect(() => {
    if (!observer) {
      observer = new IntersectionObserver(onIntersection, {
        // 확인을 위해 이미지 0.9정도 나타날 때 로딩한다.
        threshold: 0.9,
      });
    }
    REF.current && observer.observe(REF.current);
  }, []);
  return (
    <div ref={REF}>
      {isLoad ? (
        // <div key={product.id} className="group relative">
        //     <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        //       <img
        //         src={product.imageSrc}
        //         alt={product.imageAlt}
        //         className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        //       />
        //     </div>
        //     <div className="mt-4 flex justify-between">
        //       <div>
        //         <h3 className="text-sm text-gray-700">
        //           <a href={product.href}>
        //             <span aria-hidden="true" className="absolute inset-0" />
        //             {product.name}
        //           </a>
        //         </h3>
        //         <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        //       </div>
        //       <p className="text-sm font-medium text-gray-900">
        //         {product.price}
        //       </p>
        //     </div>
        //   </div>
        <Link key={product.productId} to={`/product/${product.productId}`}>
          <Content className={styles.Product_Container}>
            <img
              className={styles.Product_Img_Content}
              src={product.photo}
              alt={product.alt ? product.alt : 'Products Image'}
            />
            {product.isNew && (
              <span className={styles.Product_Event_Title}>#신제품</span>
            )}
            {product.isBest && (
              <span className={styles.Product_Event_Title}>#인기제품</span>
            )}
            <span className={styles.Product_Name_Content}>{product.name}</span>
            <span className={styles.Product_Sale_Content}>
              주문시 10% 추가 할인쿠폰 사용 가능
            </span>
            <span className={styles.Product_Price_Content}>
              {useNumberComma(product.price)}원
            </span>
          </Content>
        </Link>
      ) : (
        <ul>{SkeletonContent(1)}</ul>
      )}
    </div>
  );
};
let observer: IntersectionObserver | null = null;
const LOAD_EVENT_TYPE = 'load';

function onIntersection(
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver,
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_EVENT_TYPE));
    }
  });
}

export default Product;

const Content = styled.div`
  img {
    width: 280px;
    height: 250px;
    margin-bottom: 5px;
  }
  span {
    display: block;
  }
`;
