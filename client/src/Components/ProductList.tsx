import { FC } from 'react';
import styles from './Styles/ProductList.module.css';
import { Link } from 'react-router-dom';

interface Products {
  productId: number;
  name: string;
  price: number;
  photo: string;
}

interface Props {
  products: Products[];
}

const ProductList: FC<Props> = ({ products }) => {
  const alt = 'Products Image';
  return (
    <div className="bg-white">
      <div className={styles.Products_Container}>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.productId}
              to={`/product/${product.productId}`}
              className="group"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.photo}
                  alt={alt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}원
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
