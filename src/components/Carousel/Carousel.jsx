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
        <SwiperSlide>
          <RegionImg src={`https://picsum.photos/id/114/1920/1080`} alt='기본 배경 이미지입니다.' />
        </SwiperSlide>
        <SwiperSlide>
          <RegionImg src={`https://picsum.photos/id/728/1920/1080`} alt='기본 배경 이미지입니다.' />
        </SwiperSlide>
        <SwiperSlide>
          <RegionImg src={`https://picsum.photos/id/53/1920/1080`} alt='기본 배경 이미지입니다.' />
        </SwiperSlide>
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
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--sub-bg-color);
    border-radius: 1rem;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    font-size: var(--fs-lg);
    color: var(--btn-text-color);
  }

  // Page Navigation 커스텀
  .swiper-pagination-bullet {
    background-color: var(--sub-bg-color);
  }
`;

const RegionImg = styled.img``;
