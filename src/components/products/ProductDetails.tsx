import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { getProduct } from "../../apis/products";
import { useParams } from "react-router-dom";
import ProductsList from "./ProductsList";
import Button from "../common/Button";
import Modal from "../common/Modal";
import OrderForm from "../orders/OrderForm";
import { useState, useEffect } from "react";
import AuthGuard from "../../utils/AuthGuard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";
import { Image } from "../../types";
import ProductDetailsSkeleton from "../skeletons/ProductDetailsSkeleton";
import Chat from "../chat/ChatModel";
SwiperCore.use([Navigation, Pagination]);

export const ProductDetails = () => {
  const [orderForm, setOrderForm] = useState(false);
  const [offerPage, setOfferPage] = useState(false);
  const [productImages, setProductImages] = useState<Image[]>([]);
  const { id } = useParams();

  const { isLoading, data: product } = useQuery({
    queryKey: [queryKeys.singleProduct, id],
    queryFn: () => getProduct(id || ""),
  });

  useEffect(() => {
    if (productImages.length == 0 && product) {
      setProductImages([{ url: product.thumbnail }, ...product.gallery]);
    }
  }, [productImages, setProductImages, product]);

  return (
    <div>
      {isLoading && <ProductDetailsSkeleton />}
      {product && (
        <>
          <div className='flex py-12 justify-center bg-gray-100'>
            <Container>
              <div className='flex justify-center flex-col sm:flex-row  w-full gap-9'>
                <div className='product-slide w-full sm:w-1/3'>
                  <Swiper navigation spaceBetween={0} slidesPerView={1} loop={true}>
                    {productImages.map((image, index) => (
                      <SwiperSlide key={index} className=''>
                        <img
                          src={image.url}
                          alt={`Product Image ${index + 1}`}
                          className='h-full w-full'
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className=''>
                  <div className=' space-y-2'>
                    <div className='font-medium text-md text-gray-500 uppercase'>
                      {product.category.name}
                    </div>
                    <div className='font-bold text-3xl capitalize'>
                      {product.name}
                    </div>
                    <p className='text-gray-500'>{product.description}</p>
                    <div className=' text-lg font-semibold'>${product.price}</div>
                  </div>

                  <div className='flex w-full  py-3 gap-7'>
                    <div>
                      <div className='text-md font-base text-gray-500'>
                        Condition
                      </div>
                      <div className='text-sm uppercase font-medium'>
                        {product.condition.name}
                      </div>
                    </div>
                    <div>
                      <div className='text-md font-base text-gray-500'>College</div>
                      <div className='text-sm uppercase font-medium'>
                        {product.college?.name}
                      </div>
                    </div>
                  </div>

                  <div className='sm:flex w-full items-center gap-6 py-3'>
                    <div className='flex flex-wrap sm:flex-col md:flex-row space-x-2 sm:space-x-0 sm:space-y-2 md:space-y-0 md:space-x-2'>
                      <Button label='Order now' onClick={() => setOrderForm(true)} />
                      <Button
                        label='Make an offer'
                        outline={true}
                        onClick={() => setOfferPage(true)}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='flex flex-wrap space-x-6 rounded-sm w-full xs:px-8 sm:px-0'>
                {productImages.map((img, index) => (
                  <img
                    key={img.url}
                    src={img.url}
                    alt={product.name}
                    className='w-[100px] h-[100px] rounded-md my-6'
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div> */}
              </div>
            </Container>
          </div>
          <Container>
            <ProductsList
              title='Similar products'
              products={product.similar}
              isLoading={isLoading}
            />
          </Container>

          {orderForm && (
            <AuthGuard>
              <Modal
                centered
                title='Order details'
                onClose={() => setOrderForm(false)}
                isOpen={true}
              >
                <OrderForm setIsOpen={setOrderForm} product={product} />
              </Modal>
            </AuthGuard>
          )}

          {offerPage && (
            <AuthGuard>
              <Modal
                centered
                title='Make an offer'
                onClose={() => setOfferPage(false)}
                isOpen={true}
                modalType='chat'
              >
                <Chat setIsOpen={setOfferPage} product={product} />
              </Modal>
            </AuthGuard>
          )}

          {/* Customized Next and Prev buttons with Heroicons */}
          <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          display:none;
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          content: '';
        }
      `}</style>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
