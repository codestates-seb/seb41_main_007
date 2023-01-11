import { FC } from 'react';
import styles from './Styles/LoadingList.module.css';

const LoadingList: FC = () => {
  return (
    <div className={styles.post_list_wrapper_loading}>
      <div className="bg-white">
        <div className={styles.Products_Container}>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <div className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-500 xl:aspect-w-7 xl:aspect-h-8">
                <p className="h-full w-full object-cover object-center group-hover:opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingList;
