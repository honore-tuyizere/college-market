import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import image2 from "../../assets/pexels-karolina-grabowska-5632398.jpg";
const Slider = () => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 5000,
      }}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
      loop={true}
    >
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
          <img src={image2} alt='' className='w-full h-full object-cover' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
