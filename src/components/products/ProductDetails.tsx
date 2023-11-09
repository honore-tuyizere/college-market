import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { getProduct } from "../../apis/products";
import { useParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import Loading from "../common/Loading";
import Button from "../common/Button";
import Modal from "../common/Modal";
import OrderForm from "../orders/OrderForm";
import { useState } from "react";
import AuthGuard from "../../utils/AuthGuard";

export const ProductDetails = () => {
  const [orderForm, setOrderForm] = useState(false);
  const { id } = useParams();

  const { isLoading, data: product } = useQuery({
    queryKey: [queryKeys.singleProduct, id],
    queryFn: () => getProduct(id || ""),
  });

  return (
    <Container>
      {isLoading && <Loading />}
      {product && (
        <>
          <div className='flex flex-col py-12 px-8 items-center'>
            <div className=' flex flex-wrap w-full pb-3 xl:space-x-28 justify-center'>
              <div className='w-full max-w-[400px] flex flex-col'>
                <div className='bg-gray-100 rounded-xl shadow-2xl flex justify-center'>
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className='w-full h-full rounded-xl'
                  />
                </div>
                <div className='flex flex-wrap space-x-6 rounded-sm'>
                  {product.gallery.map((img) => (
                    <img
                      src={img.url}
                      alt={product.name}
                      className='w-[100px] h-[100px] rounded-md my-6'
                    />
                  ))}
                </div>
              </div>
              <div className='w-full max-w-[500px]'>
                <div className=''>
                  <div className='font-medium text-md text-gray-500 uppercase'>
                    {product.category.name}
                  </div>
                  <div className='font-bold text-3xl capitalize'>{product.name}</div>
                  <p className='py-8 text-gray-500'>{product.description}</p>
                </div>

                <div className='flex w-full justify-between py-3'>
                  <div className='w-full'>
                    <div className='text-md font-base text-gray-500'>CONDITION</div>
                    <div className='text-lg uppercase font-medium'>
                      {product.condition.name}
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='text-md font-base text-gray-500'>COLLEGE</div>
                    <div className='text-lg uppercase font-medium'>
                      {product.college?.name}
                    </div>
                  </div>
                </div>

                <div className='sm:flex w-full justify-between py-3'>
                  <div className='w-full'>
                    <div className='text-teal-600 font-extra-bold text-5xl w-full block'>
                      ${product.price}
                    </div>
                  </div>
                  <div className='w-full flex space-x-2'>
                    <Button label='Order now' onClick={() => setOrderForm(true)} />
                    <Button label='Make an offer' outline={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductsList
            title='Similar products'
            products={product.similar}
            isLoading={isLoading}
          />

          {orderForm && (
            <AuthGuard>
              <Modal
                title='Order details'
                onClose={() => setOrderForm(false)}
                isOpen={orderForm}
              >
                <OrderForm setIsOpen={setOrderForm} product={product} />
              </Modal>
            </AuthGuard>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductDetails;
