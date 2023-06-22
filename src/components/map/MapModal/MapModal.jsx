import React from 'react';
import Map from '../Map/Map';
import styled from 'styled-components';
import closeIcon from '../../../assets/images/close-icon.svg';

const MapModal = ({ CloseButtonHandler }) => {
  return (
    <>
      <MapContainer>
        <Map width='800' height='800' />
        <Img
          src={closeIcon}
          alt='닫기 버튼'
          onClick={() => {
            CloseButtonHandler();
          }}
        />
      </MapContainer>
    </>
  );
};

export default MapModal;

const MapContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  width: 800px;
  height: 800px;
  z-index: 200;
  background: #ffffff;
  border: 3px solid var(--main-bg-color);
  border-radius: 20px;
`;

const Img = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  z-index: 999;
  cursor: pointer;
  user-select: none;
`;
