import React from 'react';
import styled from 'styled-components';
import userIcon from '../../../../../assets/images/user-icon.svg';
import closeIcon from '../../../../../assets/images/close-icon.svg';

const Modal = ({ toggle, secondRef, profileImage, ProfileImgAlt, nickname, introduction }) => {
  return (
    <>
      <ModalContainer ref={secondRef}>
        <CloseIcon src={closeIcon} alt='닫기 아이콘' onClick={toggle} />
        <ProfileImg src={profileImage ? profileImage : userIcon} alt={ProfileImgAlt} />
        <UserNameP>{nickname}</UserNameP>
        <ContentP>{introduction !== '' ? introduction : '작성된 소개 글이 없습니다.'}</ContentP>
      </ModalContainer>
      <ModalOverlay></ModalOverlay>
    </>
  );
};

export default Modal;

const ModalContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 32rem;
  min-height: 38rem;
  padding: 3rem 2rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  z-index: 100;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: var(--profile-bg-color);
`;

const UserNameP = styled.p`
  font-size: var(--fs-lg);
  font-weight: 500;
`;

const ContentP = styled.p`
  font-size: var(--fs-xs);
  width: 100%;
  height: 22rem;
  background: #f5f5f5;
  border-radius: 8px;
  line-height: 2.2rem;
  padding: 0.6rem 0.8rem;
  overflow: auto;
  cursor: default;
  &:hover {
    box-shadow: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;
