import React from 'react';
import Map from '../Map/Map';
import styled from 'styled-components';
import LocalSVGSprite from '../../SVGSprite/LocalSVGSprite';

const MapModal = ({ toggle, modalRef }) => {
  return (
    <>
      <MapContainer ref={modalRef}>
        <Map width='800' height='800' toggle={toggle} />
        <SVGWrapper>
          <LocalSVGSprite id='close-icon' ariaLabel='닫기 아이콘' onClickHandler={toggle} />
        </SVGWrapper>
      </MapContainer>
    </>
  );
};

export default MapModal;

const MapContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  z-index: 200;
  background: #ffffff;
  border-radius: 12px;
`;

const SVGWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  z-index: 999;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  &:hover {
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  }
`;
