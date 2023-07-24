import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';

const Modal = ({ toggle, secondRef, confirm, modalHeading }) => {
  // 엔터 누르면 확인, Esc 누르면 취소하는 기능
  const onKeyDownHandler = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        confirm();
      } else if (e.key === 'Escape') {
        toggle();
      }
    },
    [confirm, toggle],
  );

  // 컴포넌트가 마운트될 때 키 이벤트를 추가, 언마운트될 때 제거
  useEffect(() => {
    document.addEventListener('keydown', onKeyDownHandler);

    return () => {
      document.removeEventListener('keydown', onKeyDownHandler);
    };
  }, [onKeyDownHandler]);

  return (
    <>
      <ModalContainer ref={secondRef}>
        <ModalHeading>{modalHeading}</ModalHeading>
        <ButtonWrapper>
          <Button size='modalCancel' onClickHandler={toggle}>
            취소
          </Button>
          <Button size='modalConfirm' onClickHandler={confirm}>
            확인
          </Button>
        </ButtonWrapper>
      </ModalContainer>
      <ModalOverlay></ModalOverlay>
    </>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 24rem;
  min-height: 14rem;
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  z-index: 100;
`;

const ModalHeading = styled.h4`
  font-size: var(--fs-sm);
  font-weight: 500;
  line-height: 2rem;
  word-break: break-all;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
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
