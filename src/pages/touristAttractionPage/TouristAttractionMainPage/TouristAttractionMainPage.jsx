import React from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const regions = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
];

const TouristAttractionMainPage = () => {
  const navigate = useNavigate();

  const movePageHandler = (region) => {
    console.log(`${region} 관광지 페이지로 이동!`);
    navigate(`/tour/${region}`);
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='관광지' />
        <Container>
          {regions.map((region) => (
            <Article
              key={region}
              onClick={() => {
                movePageHandler(region);
              }}
            >
              <H3>{region}</H3>
              <Figure>
                <RegionImg src={`https://picsum.photos/600/600/?${region}`} alt={`${region}의 이미지입니다.`} />
                <ImgCover></ImgCover>
              </Figure>
            </Article>
          ))}
        </Container>
      </InnerLayout>
    </>
  );
};

export default TouristAttractionMainPage;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 5rem 0;
`;

const Article = styled.article`
  position: relative;
  width: 28.5rem;
  height: 28.5rem;
  border-radius: 2.5rem;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;

  background: var(--main-bg-color);
  transition: 0.6s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const H3 = styled.h3`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;
  font-size: var(--fs-md);
  color: #ffffff;
  font-weight: 500;
  z-index: 100;
`;

const RegionImg = styled.img``;

const ImgCover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgb(81, 81, 81) 0%, rgba(81, 81, 81, 0) 50%);
`;
