import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import checkIcon from '../../../../assets/images/check-icon.svg';
import plusIcon from '../../../../assets/images/plus-icon.svg';
import Button from '../../Button/Button';
import API from '../../../../api/API';
import ENDPOINT from '../../../../api/ENDPOINT';
import useSnackbar from '../../../../hooks/useSnackbar';
import LocalSVGSprite from '../../../SVGSprite/LocalSVGSprite';

const ScrapModal = ({ toggle, secondRef, postId, setIsBookMarked, getMyScrapList }) => {
  const [scrapList, setScrapList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const handleSnackbarOpen = () => {
    showSnackbar('스크랩이 해제되었습니다.', 3000);
  };

  // 컬렉션 가져오기
  const getCollections = useCallback(async () => {
    await API(`${ENDPOINT.COLLECTIONS}/${postId}`, 'GET')
      .then((res) => {
        setScrapList(res.data);
        res.data.forEach((item) => {
          if (item.scrap) {
            setSelectedCategories((prev) => [...prev, item.collection.name]);
            setIsBookMarked(true);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, setIsBookMarked]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  // 임시 코드
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!selectedCategories.length) {
        setIsBookMarked && setIsBookMarked(false);
      }
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedCategories.length, setIsBookMarked]);

  //
  const handleCategoryChange = (category) => {
    setIsAddingCategory(false);

    // 카테고리가 이미 선택된 상태인지 확인
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) => prevSelected.filter((item) => item !== category));
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  // 카테고리 추가 (컬렉션 추가)
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

    API(`${ENDPOINT.COLLECTIONS}`, 'POST', { name: newCategoryName })
      .then((res) => {
        getCollections();
        setNewCategoryName('');
        setIsAddingCategory(false);
      })
      .catch((err) => {
        if (err.response.data.error === '이미 사용 중인 이름입니다.') {
          alert('이미 존재하는 카테고리입니다.');
        }
      });
  };

  // 스크랩 하기
  const HandleScrap = () => {
    API(`${ENDPOINT.SCRAPS}/${postId}`, 'POST', { collectionIds: categoryIds })
      .then((res) => {
        toggle();
        getMyScrapList && getMyScrapList();
        setIsBookMarked(true);
      })
      .catch((err) => console.log(err));
  };

  // 스크랩 해제
  const HandleCancelScrap = (collectionId) => {
    API(`${ENDPOINT.SCRAPS}/${postId}`, 'DELETE', { collectionIds: [collectionId] })
      .then((res) => {
        handleSnackbarOpen();
        setTimeout(() => {
          getMyScrapList && getMyScrapList();
        }, 800);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ModalContainer ref={secondRef}>
        <CloseSVGWrapper>
          <LocalSVGSprite id='close-icon' ariaLabel='닫기 아이콘' onClickHandler={toggle} />
        </CloseSVGWrapper>
        <AddCategoryButton
          onClick={() => {
            setIsAddingCategory(true);
          }}
          isAddingCategory={isAddingCategory}
        ></AddCategoryButton>
        {isAddingCategory && (
          <NewCategoryInput>
            <input
              type='text'
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
              }}
              placeholder='추가할 카테고리명을 입력해 주세요.'
              autoFocus
            />
            <Button size='modalConfirm' onClickHandler={handleAddCategory}>
              확인
            </Button>
          </NewCategoryInput>
        )}
        {scrapList.map((category) => (
          <CustomLabel key={category.collection._id}>
            <CustomInput
              type='checkbox'
              checked={selectedCategories.includes(category.collection.name)}
              onChange={() => {
                if (selectedCategories.includes(category.collection.name)) {
                  // 이미 선택된 카테고리를 다시 클릭하면 해제
                  handleCategoryChange(category.collection.name);
                  setCategoryIds((prev) => prev.filter((id) => id !== category.collection._id));
                  HandleCancelScrap(category.collection._id); // 스크랩 취소 함수 호출
                } else {
                  // 선택되지 않은 카테고리를 선택
                  handleCategoryChange(category.collection.name);
                  setCategoryIds((prev) => [...prev, category.collection._id]);
                }
              }}
            />
            {category.collection.name}
          </CustomLabel>
        ))}
        <Button
          size='md'
          disabled={!selectedCategories.length}
          onClickHandler={() => {
            HandleScrap();
          }}
        >
          스크랩 하기
        </Button>
      </ModalContainer>
      <ModalOverlay></ModalOverlay>
      <SnackbarComponent />
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
  padding: 4rem 2rem 2rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  background: #ffffff;
  z-index: 100;
`;

const CloseSVGWrapper = styled.div`
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
