import Empty from 'Components/Common/Empty';
import CustomTitle from 'Components/Header/CustomTitle';
import { useCustomQuery } from 'CustomHook/useCustomQuery';
import { FC } from 'react';
import NotFoundPage from './NotFoundPage';
import { BGcontainer } from 'Components/Common/BGcontainer';
import ProductList from 'Components/Common/ProductList';

import Navigation from 'Components/Pagination/Navigation';
import { useNavigate } from 'react-router-dom';

const AllProductsPage: FC = () => {
  const navigate = useNavigate();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const page = params.get('page');
  const queryKey = `productsAll${page}`;
  const { isLoading, data, error } = useCustomQuery(
    `/products?sort=likeCount&order=ascending&page=${page}`,
    queryKey,
  );
  if (isLoading)
    return (
      <>
        <CustomTitle title={`상품 리스트 | FarmPi`} />
        <Empty />;
      </>
    );
  if (error || data.data.length === 0) return <NotFoundPage />;

  const handlerSetOffset = (page: number) => {
    window.scrollTo(0, 0);
    return navigate(
      `/products/all?sort=likeCount&order=ascending&page=${page}`,
    );
  };

  return (
    <main>
      <BGcontainer>
        <ProductList products={data.data} />
        <Navigation
          totalPage={data.pageInfo.totalPages}
          currentPage={data.pageInfo.page}
          callbackFunc={handlerSetOffset}
        />
      </BGcontainer>
    </main>
  );
};

export default AllProductsPage;
