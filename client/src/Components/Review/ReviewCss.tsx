import styled from 'styled-components';

const User = styled.div`
  display: flex;
  margin-top: 8px;
  .username {
    padding-right: 18px;
  }
  .rating {
    margin-right: 58px;
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
  // More products...
];

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="pb-7 text-2xl font-bold tracking-tight text-gray-900">
          Review
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3  xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="group flex gap-x-4"
            >
              <div className="aspect-w-1 aspect-h-1  overflow-hidden rounded-lg">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-28 w-28 group-hover:opacity-75"
                />
              </div>
              <div>
                <h3 className="mt-4 text-base text-gray-700">
                  {product.title}
                </h3>
                <div className="gap-y-">
                  <Product>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {product.product}
                    </p>
                  </Product>
                  <User>
                    <p className="username text-sm">{product.user}</p>
                    <p className="rating text-sm">{product.rating}</p>
                    <p className="date text-sm text-gray-400">{product.date}</p>
                  </User>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
