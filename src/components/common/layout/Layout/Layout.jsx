import React from 'react';
import styled from 'styled-components';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import MapModal from '../../../map/MapModal/MapModal';
import useModal from '../../../../hooks/useModal';
import LocalSVGSprite from '../../../SVGSprite/LocalSVGSprite';

// 사이드 버튼은 default로 true이며, 사이드 버튼이 필요없는 페이지는 false로 사용
const Layout = ({ children, sideButton = true }) => {
  // 지도 버튼 기능 UseModal
  const [openModal, toggle, firstRef, secondRef] = useModal();

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
        {openModal ? (
          <>
            <ModalOverlay onClick={toggle}></ModalOverlay>
            <MapModal toggle={toggle} modalRef={secondRef} />
          </>
        ) : (
          <></>
        )}
        <Header />
        <SubContainer>{children}</SubContainer>
        {sideButton ? (
          <>
            <MapButton type='button' onClick={toggle} ref={firstRef}>
              <LocalSVGSprite id='map-icon' color='transparent' width='65%' height='65%' ariaLabel='맵 아이콘' />
            </MapButton>
            <TopButton type='button' onClick={scrollToTop}>
              <LocalSVGSprite
                id='chevron-icon'
                color='transparent'
                width='65%'
                height='65%'
                ariaLabel='탑 버튼 아이콘'
              />
            </TopButton>
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

// 빈 화면 클릭 시, 지도 닫히게
const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 150;
  background: rgba(0, 0, 0, 0.5);
`;

const MapButton = styled.button`
  position: fixed;
  bottom: 12.8rem;
  right: 3.2rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 1px solid var(--sub-text-color);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const TopButton = styled(MapButton)`
  bottom: 6.4rem;
`;
