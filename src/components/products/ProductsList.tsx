import { FC } from "react";
import Productcard from "./Productcard";
import { ProductListProps } from "../../types";

const ProductsList: FC<ProductListProps> = ({
  title,
  filtersComponent,
  products,
}) => {
  if (!filtersComponent && !title) {
    throw new Error(
      "At least one of 'filtersComponent' or 'title' prop must be provided.",
    );
  }
  return (
    <div className='w-full'>
      {title && !filtersComponent && (
        <div className='py-5'>
          <span className=' font-semibold text-md'>{title}</span>
        </div>
      )}
      {filtersComponent && <div className='py-4'>{filtersComponent}</div>}
      <div className='grid grid-cols1 xxs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4  py-3'>
        {products?.map((product) => (
          <Productcard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
