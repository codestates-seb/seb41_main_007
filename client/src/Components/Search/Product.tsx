import { FC, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/ProductList.module.css';
import { SkeletonContent } from 'Components/Loading/LoadingList';

interface Product {
  productId: number;
  name: string;
  price: number;
  photo: string;
  alt?: string;
}
interface Props {
  product: Product;
}

const Product: FC<Props> = ({ product }) => {
  const REF = useRef<any>(null);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    function loadImage() {
      setIsLoad(true);
    }

    const imgEl = REF.current;
    imgEl && imgEl.addEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
    return () => {
      imgEl && imgEl.removeEventListener(LOAD_IMG_EVENT_TYPE, loadImage);
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
          <div className={styles.Product_Img_Container}>
            <img
              className={styles.Product_Img_Content}
              src={product.photo}
              alt={product.alt ? product.alt : 'Products Image'}
            />
          </div>
          <h3 className={styles.Product_Name_Content}>{product.name}</h3>
          <p className={styles.Product_Price_Content}>{product.price}원</p>
        </Link>
      ) : (
        <ul>{SkeletonContent(1)}</ul>
      )}
    </div>
  );
};
let observer: IntersectionObserver | null = null;
const LOAD_IMG_EVENT_TYPE = 'loadImage';

function onIntersection(
  entries: IntersectionObserverEntry[],
  io: IntersectionObserver,
) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
}

export default Product;
