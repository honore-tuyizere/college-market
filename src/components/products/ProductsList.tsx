import { FC } from "react";
import Productcard from "./Productcard";
import { ProductListProps } from "../../types";
import Skeleton from "react-loading-skeleton";
const ProductsList: FC<ProductListProps> = ({
  title,
  filtersComponent,
  products,
  isLoading,
  orders,
}) => {
  if (!filtersComponent && !title) {
    throw new Error(
      "At least one of 'filtersComponent' or 'title' prop must be provided.",
    );
  }
  return (
    <div className='w-full'>
      {isLoading && (
        <div className='grid  xxs:grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  py-3'>
          {Array.from({ length: 5 }, (_, index) => index).map((item) => (
            <Skeleton key={item} className=' h-52' />
          ))}
        </div>
      )}
      {!isLoading && (
        <div className='w-full'>
          {title && <div className='py-4 font-bold text-md'>{title}</div>}
          {filtersComponent && <div className='py-4'>{filtersComponent}</div>}
          <div className='grid xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  py-3'>
            {products?.map((product) => (
              <Productcard key={product._id} product={product} />
            ))}
          </div>
          {orders && (
            <div className='grid xxs:grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4  py-'>
              {orders.map((order) => {
                return (
                  <Productcard
                    order={order}
                    key={order._id}
                    product={order.product}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
