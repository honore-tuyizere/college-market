import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllHeroSliders } from "../../apis/slider";
import { queryKeys } from "../../utils/queryKeys";
import { ISlider } from "../../types";

const Slider = () => {
  const { data: sliders } = useQuery({
    queryFn: () => getAllHeroSliders(),
    queryKey: queryKeys.getAllHeroSliders,
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
                <div className='w-full h-52 md:h-96  lg:h-[500px]'>
                  <img
                    src={slider.photo}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                </div>
              </SwiperSlide>
            </>
          ))
        ) : (
          <>
            <SwiperSlide>
              <div className='w-full h-52 md:h-96  lg:h-[500px]'>
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
              <div className='w-full h-52 md:h-96  lg:h-[500px]'>
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
    </div>
  );
};

export default Slider;
