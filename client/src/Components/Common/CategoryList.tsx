import { FC } from 'react';
import styles from './Styles/Category.module.css';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { Link } from 'react-router-dom';

const CategoryList: FC = () => {
  const { data, isLoading, error } = useCustomQuery(
    '/categories',
    'categories',
  );
  if (isLoading) return <></>;
  if (error) return <></>;
  return (
    <div className="relative w-72">
      <div className={styles.Category_Container}>
        <div className="fixed w-64">
          <strong className={styles.Category_Title}> 모든 상품</strong>
          <ul>
            {data.map((category: Category) => (
              <li key={category.categoryId} className={styles.Category_Content}>
                <Category
                  categoryId={category.categoryId}
                  name={category.name}
                  sequenceNum={category.sequenceNum}
                  createdAt={category.createdAt}
                  modifiedAt={category.modifiedAt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

interface Category {
  categoryId: number;
  name: string;
  sequenceNum: number;
  createdAt: Date;
  modifiedAt: Date;
}

const Category: FC<Category> = ({ categoryId, name }) => {
  return <Link to={`/products/${categoryId}`}>{name}</Link>;
};

export default CategoryList;
