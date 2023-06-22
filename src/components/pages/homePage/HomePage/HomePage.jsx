import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Carousel from '../../../Carousel/Carousel';
import InnerLayout from '../../../common/layout/InnerLayout/InnerLayout';
import Post from '../../../common/Post/Post';
import HeadingLayout from '../../../common/layout/HeadingLayout/HeadingLayout';
import Button from '../../../common/Button/Button';
import RegionFilterButton from '../RegionFilterButton/RegionFilterButton';
import chevronUpIcon from '../../../../assets/images/chevron-up-icon.svg';
import chevronDownIcon from '../../../../assets/images/chevron-down-icon.svg';
import searchIcon from '../../../../assets/images/search-icon.svg';

const HomePage = () => {
  // (지역) 드롭 다운 버튼 클릭 시
  const [isClicked, setIsClicked] = useState(false);
  const dropDownState = {
    true: chevronUpIcon,
    false: chevronDownIcon,
  };

  // 지역 버튼 개수에 따른 화면 레이아웃 변화 기능
  const [regionsCount, setRegionsCount] = useState();
  const getRigionsLengthHandler = (count) => {
    setRegionsCount(count);
  };

  const [postContainerLayout, setPostContainerLayout] = useState('12rem');

  useEffect(() => {
    if (regionsCount === 0) {
      setPostContainerLayout('3rem');
    } else if (regionsCount !== 0 && regionsCount <= 13) {
      setPostContainerLayout('7.7rem');
    } else {
      setPostContainerLayout('12rem');
    }
  }, [regionsCount]);

  return (
    <>
      <Carousel />
      <InnerLayout>
        <HeadingLayout heading='여행 피드' />
        <Ul>
          <Li>
            <DropDownButton
              type='button'
              onClick={() => {
                setIsClicked((cur) => !cur);
              }}
              dropDownState={dropDownState[isClicked]}
            >
              지역
            </DropDownButton>
            <RegionFilterButton
              isClicked={isClicked}
              getRigionsLengthHandler={getRigionsLengthHandler}
            ></RegionFilterButton>
          </Li>
          <Li>
            <Button
              size='md'
              variants='main'
              onClickHandler={() => {
                console.log('최신 순 버튼 클릭!');
              }}
            >
              최신 순
            </Button>
          </Li>
          <Li>
            <Button
              size='md'
              variants='main'
              onClickHandler={() => {
                console.log('인기 순 버튼 클릭!');
              }}
              disabled
            >
              인기 순
            </Button>
          </Li>
          <Li>
            <Button
              size='md'
              variants='main'
              onClickHandler={() => {
                console.log('댓글 순 버튼 클릭!');
              }}
              disabled
            >
              댓글 순
            </Button>
          </Li>
          <Li>
            <SearchInput type='search' placeholder='검색' />
            <SearchImage src={searchIcon} alt='검색하기 아이콘' />
          </Li>
        </Ul>
        <PostContainer postContainerLayout={postContainerLayout}>
          <Post userName='userName' />
          <Post userName='userName' />
          <Post userName='userName' />
          <Post userName='userName' />
          <Post userName='userName' />
        </PostContainer>
      </InnerLayout>
    </>
  );
};

export default HomePage;

const Ul = styled.ul`
  display: flex;
  gap: 1.6rem;
  margin-top: 3rem;
  position: relative;
`;

const Li = styled.li`
  &:last-child {
    display: flex;
  }
`;

const DropDownButton = styled.button`
  width: 27.4rem;
  height: 4.5rem;
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--btn-text-color);
  border-radius: 8px;
  background: url(${(props) => props.dropDownState}) no-repeat 90%/10% var(--main-btn-color);

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 56.2rem;
  height: 4.5rem;
  border: 2px solid var(--sub-btn-color);
  border-radius: 40px;
  padding: 1rem 1.5rem;
  font-size: var(--fs-md);

  // seacrch 아이콘 background로 사용하기
  /* background: url(${searchIcon}) no-repeat 98%/5%; */

  &:focus {
    outline: none;
    border: 2px solid var(--sub-btn-color);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }

  // search X버튼 없애기
  &::-ms-clear,
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

// search 아이콘 이미지로 사용하기
const SearchImage = styled.img`
  width: 3rem;
  height: 3rem;
  display: inline-block;
  margin-left: -4rem;
  margin-top: 0.6rem;
  cursor: pointer;
`;

// 지역 버튼 개수에 따른 레이아웃 변화
const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-top: ${(props) => props.postContainerLayout};
`;
