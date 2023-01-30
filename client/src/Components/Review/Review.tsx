import styled from 'styled-components';
import Ratingstar from 'Components/Common/Ratingstar';
import styles from './Styles/Review.module.css';

const User = styled.div`
  display: flex;
  margin-top: 20px;
  p {
    display: block;
  }
`;

const Product = styled.div`
  margin-top: 8px;
`;
const products = [
  {
    id: 1,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '이유정',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt:
      'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '황낙준',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt:
      'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '서형민',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt:
      'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '이유정',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '황낙준',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    title: '이거 좋아요',
    href: '#',
    product: 'a물품이름',
    user: '서형민',
    rating: '⭐⭐⭐⭐',
    date: '2023.01.11',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt:
      'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
];

const Review: React.FC = () => {
  return (
    <div className={styles.Review_Container}>
      <div className={styles.Review_Content}>
        <h2 className={styles.Review_Title}>고객만족후기</h2>
        <div className={styles.Review_Data}>
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className={styles.Review_Detail_Content}
            >
              <div className={styles.Review_Image_Container}>
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className={styles.Review_Image_Content}
                />
              </div>
              <div>
                <h3 className={styles.Review_Product_Container}>
                  {product.title}
                </h3>
                <div className="">
                  <Product>
                    <p className={styles.Review_Product_Title}>
                      {product.product}
                    </p>
                  </Product>
                  <User>
                    <p className={styles.Review_User}>{product.user}</p>
                    <p className={styles.Review_Rating}>{product.rating}</p>
                    <p className={styles.Review_Date}>{product.date}</p>
                  </User>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Review;
