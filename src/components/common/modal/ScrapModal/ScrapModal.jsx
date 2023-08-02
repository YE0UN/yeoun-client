import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import closeIcon from '../../../../assets/images/close-icon.svg';
import checkIcon from '../../../../assets/images/check-icon.svg';
import plusIcon from '../../../../assets/images/plus-icon.svg';
import Button from '../../Button/Button';

const ScrapModal = ({ toggle, secondRef, confirm }) => {
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

  const [scrapList, setScrapList] = useState(['여행', '맛집']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleCategroyChange = (category) => {
    setIsAddingCategory(false);

    // 카테고리가 중복으로 선택됨을 방지
    setSelectedCategory((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [category];
      }
    });
  };

  const handleAddCategory = () => {
    if (scrapList.length >= 10) {
      setNewCategoryName('');
      setIsAddingCategory(false);
      return alert(
        '카테고리는 10개를 초과할 수 없습니다.\n새로운 카테고리를 원하시면 마이페이지에서 카테고리 메뉴를 수정해 주세요.',
      );
    }
    // 의미 없는 공백 입력 방지
    if (newCategoryName.trim() === '') {
      return;
    }
    // 카테고리명 중복 체크
    if (scrapList.includes(newCategoryName)) {
      alert('이미 존재하는 카테고리입니다.');
      return;
    }

    setScrapList((prevList) => [newCategoryName, ...prevList]);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  return (
    <>
      <ModalContainer ref={secondRef}>
        <CloseIcon src={closeIcon} alt='닫기 아이콘' onClick={toggle} />
        <AddCategoryButton
          onClick={() => setIsAddingCategory(true)}
          isAddingCategory={isAddingCategory}
        ></AddCategoryButton>
        {isAddingCategory && (
          <NewCategoryInput>
            <input
              type='text'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder='추가할 카테고리명을 입력해 주세요.'
            />
            <Button size='modalConfirm' onClickHandler={handleAddCategory}>
              확인
            </Button>
          </NewCategoryInput>
        )}
        {scrapList.map((category) => (
          <CustomLabel key={category}>
            <CustomInput
              type='radio'
              checked={selectedCategory.includes(category)}
              onChange={() => {
                handleCategroyChange(category);
              }}
            />
            {category}
          </CustomLabel>
        ))}
        <Button size='md' disabled={!selectedCategory}>
          스크랩 하기
        </Button>
      </ModalContainer>
      <ModalOverlay></ModalOverlay>
    </>
  );
};

export default ScrapModal;

const ModalContainer = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 40rem;
  min-height: 20rem;
  padding: 4rem 2rem 2rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
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

const AddCategoryButton = styled.button`
  display: ${(props) => (props.isAddingCategory ? 'none' : 'block')};
  width: 3.2rem;
  height: 3.2rem;
  background: url(${plusIcon}) var(--main-checkbox-color) center/100% no-repeat;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
`;

const NewCategoryInput = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  input {
    width: 100%;
    height: 4rem;
    font-size: var(--fs-xs);
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 0.4rem;

    &:focus {
      outline: none;
      border: 2px solid var(--input-border-focus-color);
    }
  }
`;

const CustomLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: var(--fs-md);
  font-weight: 500;
  user-select: none;
  cursor: pointer;
`;

const CustomInput = styled.input`
  width: 3.2rem;
  height: 3.2rem;
  margin: 0;
  appearance: none;
  border: 1px solid var(--main-checkbox-color);
  background: #ffffff;
  cursor: pointer;

  :checked {
    background: url(${checkIcon}) var(--main-checkbox-color) center/80% no-repeat;
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
