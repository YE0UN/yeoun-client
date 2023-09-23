import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';
import LocalSVGSprite from '../../../SVGSprite/LocalSVGSprite';

const CategoryEditModal = ({ toggle, secondRef, confirm, initialName, getNameValue }) => {
  const [value, setValue] = useState(initialName);

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

  const handleChange = (e) => {
    if (!(value.length === 0 && e.target.value === ' ')) {
      setValue(e.target.value);
      getNameValue(e.target.value);
    }
  };

  return (
    <>
      <ModalContainer ref={secondRef}>
        <SVGWrapper>
          <LocalSVGSprite id='close-icon' ariaLabel='닫기 아이콘' onClickHandler={toggle} />
        </SVGWrapper>
        <Input
          type='text'
          placeholder='변경할 이름을 입력해 주세요.'
          onChange={handleChange}
          value={value}
          maxLength={18}
          autoFocus
        />
        <ButtonWrapper>
          <Button size='modalCancel' onClickHandler={toggle}>
            취소
          </Button>
          <Button size='modalConfirm' onClickHandler={confirm}>
            변경
          </Button>
        </ButtonWrapper>
      </ModalContainer>
      <ModalOverlay></ModalOverlay>
    </>
  );
};

export default CategoryEditModal;

const ModalContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;
  padding: 4rem 2rem 2rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  z-index: 100;
`;

const SVGWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 4rem;
  font-size: var(--fs-md);
  padding: 1rem;
  border: 2px solid var(--input-border-color);
  outline: none;

  &:focus {
    border: 2px solid var(--input-border-focus-color);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
