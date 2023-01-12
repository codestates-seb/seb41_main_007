import { FC } from 'react';
import styles from './Styles/ProductList.module.css';
import { Link } from 'react-router-dom';

interface Products {
  productId: number;
  name: string;
  price: number;
  photo: string;
  alt?: string;
}

interface Props {
  products: Products[];
}

const ProductList: FC<Props> = ({ products }) => {
  const alt = 'Products Image';
  return (
    <div className="bg-white">
      <div className={styles.Products_Container}>
        <div className={styles.Product_List_Container}>
          {products.map((product) => (
            <Link key={product.productId} to={`/product/${product.productId}`}>
              <div className={styles.Product_Img_Container}>
                <img
                  className={styles.Product_Img_Content}
                  src={product.photo}
                  alt={product.alt ? product.alt : alt}
                />
              </div>
              <h3 className={styles.Product_Name_Content}>{product.name}</h3>
              <p className={styles.Product_Price_Content}>{product.price}원</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
