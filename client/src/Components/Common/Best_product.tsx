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

const Best_Product: FC<Props> = ({ product }) => {
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
            <div className="flex justify-between">
              <span className={styles.Product_Name_Content}>
                {product.name}
              </span>
              <div className="mt-2 text-xs w-18 font-mono pt-1 font-bold">
                평점 {Math.round(product.rating * 100) / 100}
              </div>
            </div>
            <span className={styles.Product_Sale_Content}>
              10% 추가 할인쿠폰 사용 가능
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

export default Best_Product;

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
