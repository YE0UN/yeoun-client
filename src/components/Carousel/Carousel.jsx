import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';
import styled from 'styled-components';

const Carousel = () => {
  return (
    <>
      <CustomSwiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </CustomSwiper>
    </>
  );
};

export default Carousel;

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 40rem;
  border-bottom: 1px solid var(--border-color);

  .swiper-slide {
    background-color: var(--chat-bg-color);
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // Button 커스텀
  /* .swiper-button-prev {
  }
  .swiper-button-next {
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  } */

  // Page Navigation 커스텀
  /* .swiper-pagination-bullet {
  } */
`;
