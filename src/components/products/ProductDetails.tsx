import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../utils/queryKeys";
import { getProduct } from "../../apis/products";
import { useParams } from "react-router-dom";
import ProductsList from "./ProductsList";
// import Loading from "../common/Loading";
import Button from "../common/Button";
import Modal from "../common/Modal";
import OrderForm from "../orders/OrderForm";
import { useState, useRef, useEffect } from "react";
import AuthGuard from "../../utils/AuthGuard";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";
import { Image } from "../../types";
import ProductDetailsSkeleton from "../skeletons/ProductDetailsSkeleton";
SwiperCore.use([Navigation, Pagination]);

export const ProductDetails = () => {
  const [orderForm, setOrderForm] = useState(false);
  const [productImages, setProductImages] = useState<Image[]>([]);
  const { id } = useParams();

  const { isLoading, data: product } = useQuery({
    queryKey: [queryKeys.singleProduct, id],
    queryFn: () => getProduct(id || ""),
  });

  const mainSwiper = useRef<SwiperRef>(null);

  const handleThumbnailClick = (index: number) => {
    if (mainSwiper.current && mainSwiper.current.swiper) {
      mainSwiper.current.swiper.slideTo(index);
    }
  };

  useEffect(() => {
    if (productImages.length == 0 && product) {
      setProductImages([{ url: product.thumbnail }, ...product.gallery]);
    }
  }, [productImages, setProductImages, product]);

  return (
    <Container>
      {isLoading && <ProductDetailsSkeleton />}
      {product && (
        <>
          <div className='flex py-12 justify-center'>
            <div className='flex flex-col max-w-[1000px] w-full'>
              <div className=' flex xs:flex-wrap sm:flex-nowrap w-full pb-3 xs:justify-center sm:justify-between xs:space-y-10 sm:space-y-0 sm:space-x-12'>
                <div className='xs:max-w-[380px] product-slide sm:max-w-90 lg:w-full lg:max-w-[380px] flex flex-col'>
                  <div className='bg-gray-100 rounded-xl shadow-xl flex justify-center aspect-square'>
                    <Swiper
                      navigation
                      spaceBetween={10}
                      slidesPerView={1}
                      ref={mainSwiper}
                    >
                      {productImages.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image.url}
                            alt={`Product Image ${index + 1}`}
                            className='h-full w-full rounded-xl'
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className='xs:max-w-[500px] sm:max-w-none w-full xl:max-w-[500px]'>
                  <div className=''>
                    <div className='font-medium text-md text-gray-500 uppercase'>
                      {product.category.name}
                    </div>
                    <div className='font-bold text-3xl capitalize'>
                      {product.name}
                    </div>
                    <p className='py-8 text-gray-500'>{product.description}</p>
                  </div>

                  <div className='flex w-full justify-between py-3'>
                    <div className='w-full'>
                      <div className='text-md font-base text-gray-500'>
                        CONDITION
                      </div>
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
                    <div className='w-20'>
                      <div className='text-teal-600 font-extra-bold text-5xl w-full block'>
                        ${product.price}
                      </div>
                    </div>
                    <div className='flex flex-wrap sm:flex-col md:flex-row space-x-2 sm:space-x-0 sm:space-y-2 md:space-y-0 md:space-x-2'>
                      <Button label='Order now' onClick={() => setOrderForm(true)} />
                      <Button label='Make an offer' outline={true} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex flex-wrap space-x-6 rounded-sm w-full xs:px-8 sm:px-0'>
                {productImages.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={product.name}
                    className='w-[100px] h-[100px] rounded-md my-6'
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
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
    </Container>
  );
};

export default ProductDetails;
