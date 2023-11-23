import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllAdsSliders } from "../../apis/slider";
import { queryKeys } from "../../utils/queryKeys";
import { ISlider } from "../../types";
import Modal from "../common/Modal";
import { useState } from "react";

const AdsSlider = () => {
  const { data: sliders } = useQuery({
    queryFn: () => getAllAdsSliders(),
    queryKey: queryKeys.getAllAdsSliders,
  });
  const [action, setAction] = useState({
    show: false,
    data: { title: "", description: "", photo: "" },
  });
  return (
    <div className=''>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
      >
        {sliders?.length !== 0 ? (
          sliders?.map((slider: ISlider) => (
            <>
              <SwiperSlide>
                <div className='relative'>
                  <img
                    src={slider.photo}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-auto p-4'>
                    <p className='text-[28px] mb-4'>{slider.title}</p>
                    <span className='mb-4'>
                      {" "}
                      {`${slider?.description?.slice(0, 150)}...`}
                    </span>
                    <div className='p-4 my-6'>
                      <button
                        onClick={() =>
                          setAction({
                            show: true,
                            data: {
                              title: slider.title!,
                              description: slider.description!,
                              photo: slider.photo!,
                            },
                          })
                        }
                        className='bg-[#003D29] border-[1px] border-[#003D29] rounded-lg p-2'
                      >
                        More info
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </>
          ))
        ) : (
          <>
            <SwiperSlide>
              <div className='w-full h-80'>
                <img
                  src={
                    "https://res.cloudinary.com/umuhire-heritier/image/upload/w_1666,h_400,c_fill/Home-image_1_pvyrks.png"
                  }
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='w-full h-80'>
                <img
                  src={
                    "https://res.cloudinary.com/umuhire-heritier/image/upload/w_1666,h_400,c_fill/v1699449591/e-commerce/bca32ffa-6468-498c-922b-4a360fb56e6c.jpg"
                  }
                  alt=''
                  className='w-full h-full object-cover'
                />
              </div>
            </SwiperSlide>
          </>
        )}
      </Swiper>

      <div className='mt-[100px]'>
        <Modal
          centered={true}
          title='Slider details'
          onClose={() =>
            setAction({
              show: false,
              data: { title: "", description: "", photo: "" },
            })
          }
          isOpen={action.show}
        >
          <div className='block '>
            <span className='bold text-[18px]'>{action.data.title}</span>
            <p className='pt-[4px] text-[12px]'>{action.data.description}</p>
          </div>
          <div className='py-2'>
            {action.data.photo && <img src={action.data.photo} />}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdsSlider;
