import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Carousel from './../../../components/Carousel/Carousel';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import Post from '../../../components/common/post/Post/Post';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import Button from '../../../components/common/Button/Button';
import RegionFilterButton from '../RegionFilterButton/RegionFilterButton';
import chevronUpIcon from '../../../assets/images/chevron-up-icon.svg';
import chevronDownIcon from '../../../assets/images/chevron-down-icon.svg';
import searchIcon from '../../../assets/images/search-icon.svg';
import axios from 'axios';
import Loading from './../../../components/Loading/Loading';
import useModal from '../../../hooks/useModal';
import useImagePreload from '../../../hooks/useImagePreload';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // (지역) 드롭 다운 버튼 클릭 시
  const dropDownState = {
    true: chevronUpIcon,
    false: chevronDownIcon,
  };

  // useModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  // useImagePreload
  useImagePreload([chevronUpIcon]);

  // 선택된 지역
  const [selectedRegion, setSelectedRegion] = useState();
  // console.log(selectedRegion);

  // 지역 버튼 개수에 따른 화면 레이아웃 변화 기능
  const [regionsCount, setRegionsCount] = useState();
  const getRigionsHandler = (region) => {
    setRegionsCount(region.length);
    setSelectedRegion(region);
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

  // 전체 게시물 상태관리
  const [post, setPost] = useState([]);
  // console.log(post);

  // 정렬 기준
  const [sortOrder, setSortOrder] = useState('createdAt');

  // 활성화된 버튼 상태
  const [activeButton, setActiveButton] = useState('createdAt');

  // 선택 지역 게시물 조회 기능
  const ViewSelectedPosts = useCallback(() => {
    setIsLoading(false);
    if (selectedRegion && selectedRegion.length > 0) {
      const regions = selectedRegion.map((region) => `siDo=${region}`).join('&');

      const option = {
        url: `http://localhost:3000/posts?${regions}&sort=${sortOrder}`,
        method: 'GET',
      };
      axios(option)
        .then((res) => {
          setPost(res.data);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(true);
        });
    } else {
      setPost([]);
      setIsLoading(true);
    }
  }, [selectedRegion, sortOrder]);

  useEffect(() => {
    ViewSelectedPosts();
  }, [selectedRegion, ViewSelectedPosts]);

  return (
    <>
      <Carousel />
      <InnerLayout>
        <HeadingLayout heading='여행 피드' />
        <Ul>
          <Li>
            <DropDownButton type='button' onClick={toggle} ref={firstRef} dropDownState={dropDownState[modalOpen]}>
              지역
            </DropDownButton>
            <RegionFilterButton
              modalOpen={modalOpen}
              modalRef={secondRef}
              getRigionsHandler={getRigionsHandler}
            ></RegionFilterButton>
          </Li>
          <Li>
            <Button
              size='md'
              onClickHandler={() => {
                setSortOrder('createdAt');
                setActiveButton('createdAt');
              }}
              active={activeButton === 'createdAt'}
            >
              최신 순
            </Button>
          </Li>
          <Li>
            <Button
              size='md'
              onClickHandler={() => {
                setSortOrder('like');
                setActiveButton('like');
              }}
              active={activeButton === 'like'}
            >
              인기 순
            </Button>
          </Li>
          <Li>
            <Button
              size='md'
              onClickHandler={() => {
                setSortOrder('comment');
                setActiveButton('comment');
              }}
              active={activeButton === 'comment'}
            >
              댓글 순
            </Button>
          </Li>
          <Li>
            <SearchInput type='search' placeholder='검색' />
            <SearchImage
              src={searchIcon}
              alt='검색하기 아이콘'
              onClick={() => {
                alert('준비 중입니다.');
              }}
            />
          </Li>
        </Ul>
        {isLoading ? (
          <PostContainer postContainerLayout={postContainerLayout}>
            {post.map((post, index) => {
              return (
                <Post
                  key={post.post._id}
                  profileImage={post.post.user.profileImage}
                  nickname={post.post.user.nickname}
                  bookMark={''}
                  content={post.post.content}
                  img={post.post.img}
                  likeState={post.likeState}
                  likeCount={post.post.likeCount}
                  commentCount={post.post.commentCount}
                  createdAt={post.post.createdAt}
                  postId={post.post._id}
                  introduction={post.post.user.introduction}
                />
              );
            })}
          </PostContainer>
        ) : (
          <Loading description='데이터를 불러오는 중입니다...' margin='20rem 0 10rem' />
        )}
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
  margin-bottom: 9rem;
`;
