import React from 'react';
import Map from '../Map/Map';
import styled from 'styled-components';
import closeIcon from '../../../assets/images/close-icon.svg';

const MapModal = ({ toggle, modalRef }) => {
  return (
    <>
      <MapContainer ref={modalRef}>
        <Map width='800' height='800' toggle={toggle} />
        <Img src={closeIcon} alt='닫기 버튼' onClick={toggle} />
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

const Img = styled.img`
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
