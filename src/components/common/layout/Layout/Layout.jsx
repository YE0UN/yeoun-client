import React from 'react';
import styled from 'styled-components';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import mapIcon from '../../../../assets/images/map-icon.svg';
import chevronIcon from '../../../../assets/images/chevron-icon.svg';

// 사이드 버튼은 default로 true이며, 사이드 버튼이 필요없는 페이지는 false로 사용
const Layout = ({ children, sideButton = true }) => {
  // 지도 버튼 기능
  const Map = () => {
    console.log('지도 기능이 들어갈 곳입니다.');
  };

  // 탑 버튼 기능
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'instant',
    });
  };

  return (
    <>
      <MainContainer>
        <Header />
        <SubContainer>{children}</SubContainer>
        {sideButton ? (
          <>
            <MapButton type='button' onClick={Map}></MapButton>
            <TopButton type='button' onClick={scrollToTop}></TopButton>
          </>
        ) : (
          <></>
        )}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;

const MainContainer = styled.div`
  position: relative;
  min-width: 120rem;
  height: 100%;
  margin: 0 auto;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 38rem);
`;

const MapButton = styled.button`
  position: fixed;
  bottom: 12.8rem;
  right: 3.2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid var(--sub-text-color);
  background: ${`url(${mapIcon})`} no-repeat center/65% #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const TopButton = styled(MapButton)`
  bottom: 6.4rem;
  background: ${`url(${chevronIcon})`} no-repeat center 4px #ffffff;
`;
