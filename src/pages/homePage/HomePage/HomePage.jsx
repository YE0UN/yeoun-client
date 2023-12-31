import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Carousel from './../../../components/Carousel/Carousel';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import Post from '../../../components/common/post/Post/Post';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import Button from '../../../components/common/Button/Button';
import RegionFilterButton from '../RegionFilterButton/RegionFilterButton';
import Loading from './../../../components/Loading/Loading';
import useModal from '../../../hooks/useModal';
import { useInView } from 'react-intersection-observer';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';
import LocalSVGSprite from '../../../components/SVGSprite/LocalSVGSprite';

const HomePage = () => {
  // 데이터 로딩
  const [isLoading, setIsLoading] = useState(false);
  // 페이지 상태
  const [page, setPage] = useState(1);
  // 마지막 페이지인지 확인
  const [lastPage, setLastPage] = useState(false);
  // 무한 스크롤을 위한 useInView 훅 사용
  const [ref, inView] = useInView();
  // 검색 키워드
  const [keyword, setKeyword] = useState('');

  // 스크롤에 따라 페이지 상태 변경
  useEffect(() => {
    if (inView && !lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, lastPage]);

  const refreshPost = () => {
    setPage(1);
    setLastPage(false);
  };

  // useModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  // 선택된 지역
  const [selectedRegion, setSelectedRegion] = useState();

  // 지역 버튼 개수에 따른 화면 레이아웃 변화 기능
  const [regionsCount, setRegionsCount] = useState();
  const getRigionsHandler = useCallback((region) => {
    refreshPost();
    setRegionsCount(region.length);
    setSelectedRegion(region);
  }, []);

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

  // 정렬 기준
  const [sortOrder, setSortOrder] = useState('createdAt');

  // 활성화된 버튼 상태
  const [activeButton, setActiveButton] = useState('createdAt');

  // 선택 지역 게시물 조회 기능
  const ViewSelectedPosts = useCallback(() => {
    // 첫 번째 페이지에서만 로딩 컴포넌트 보이게
    page === 1 && setIsLoading(false);

    if (selectedRegion && selectedRegion.length > 0) {
      const regions = selectedRegion.map((region) => `region=${region}`).join('&');

      API(`${ENDPOINT.POSTS}?${regions}&sort=${sortOrder}${keyword ? `&keyword=${keyword}` : ''}&page=${page}`, 'GET')
        .then((res) => {
          // 이미 마지막 페이지를 가져온 경우에는 추가적인 API 호출을 하지 않도록 함
          const { currentPage, maxPage } = res.data[res.data.length - 1];
          const isLastPage = currentPage === maxPage;
          if (isLastPage) {
            setLastPage(true);
          }

          // 첫 번째 페이지면 새로운 데이터로 갱신
          if (page === 1) {
            setPost(res.data);
          } else {
            // 첫 번째 페이지가 아니면 기존 데이터에 새로운 데이터를 추가하여 갱신
            setPost((prevPost) => [...prevPost, ...res.data]);
          }
          setIsLoading(true);
        })
        .catch((err) => {
          if (err.response.data.error === '해당 지역의 검색 결과 없음') {
            setPost([]);
          }
          console.log(err);
          setIsLoading(true);
        });
    } else {
      setPost([]);
      setIsLoading(true);
    }
  }, [selectedRegion, sortOrder, page, keyword]);

  useEffect(() => {
    if (!lastPage) {
      ViewSelectedPosts();
    }
  }, [selectedRegion, ViewSelectedPosts, lastPage]);

  const [searchInput, setSearchInput] = useState(''); // 검색어 상태 추가

  // 검색 버튼 클릭 시 검색 수행
  const handleSearch = () => {
    setKeyword(searchInput); // 검색어를 상태에 업데이트
    setPage(1); // 페이지를 초기화
    setLastPage(false); // 마지막 페이지 상태 초기화
  };

  // 엔터로 검색
  const handleKeyDowm = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Carousel />
      <InnerLayout>
        <HeadingLayout heading='여행 피드' />
        <Ul>
          <Li>
            <DropDownButton type='button' onClick={toggle} ref={firstRef}>
              지역
              <ModalSVGWrapper>
                <LocalSVGSprite
                  id={modalOpen ? 'chevron-up-icon' : 'chevron-down-icon'}
                  color='transparent'
                  width='3rem'
                  height='3rem'
                  ariaLabel={
                    modalOpen ? '지역 선택 모달 창을 닫는 화살표 아이콘' : '지역 선택 모달 창을 여는 화살표 아이콘'
                  }
                />
              </ModalSVGWrapper>
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
                refreshPost();
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
                setSortOrder('likeCount');
                setActiveButton('likeCount');
                refreshPost();
              }}
              active={activeButton === 'likeCount'}
            >
              인기 순
            </Button>
          </Li>
          <Li>
            <Button
              size='md'
              onClickHandler={() => {
                setSortOrder('commentCount');
                setActiveButton('commentCount');
                refreshPost();
              }}
              active={activeButton === 'commentCount'}
            >
              댓글 순
            </Button>
          </Li>
          <Li>
            <SearchInput
              type='search'
              placeholder='검색'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDowm}
            />
            <SearchSVGWrapper>
              <LocalSVGSprite
                id='search-icon'
                color='transparent'
                width='3rem'
                height='3rem'
                ariaLabel='검색하기 아이콘'
                onClickHandler={handleSearch}
              />
            </SearchSVGWrapper>
          </Li>
        </Ul>
        {isLoading ? (
          <PostContainer postContainerLayout={postContainerLayout}>
            {post.length === 0 && <EmptyPostMessage>등록된 게시물이 없습니다.</EmptyPostMessage>}
            {post.map((post, index) => {
              // 해당 항목이 유효한 구조를 가지는지 확인
              if (post && post.post && post.post.user) {
                return (
                  <Post
                    key={post.post._id}
                    profileImage={post.post.user.profileImage}
                    nickname={post.post.user.nickname}
                    content={post.post.content}
                    img={post.post.img}
                    scrap={post.scrap}
                    likeState={post.likeState}
                    likeCount={post.post.likeCount}
                    commentCount={post.post.commentCount}
                    createdAt={post.post.createdAt}
                    postId={post.post._id}
                    introduction={post.post.user.introduction}
                  />
                );
              } else if (post && post.post && post.post.user === null) {
                return (
                  <Post
                    key={post.post._id}
                    profileImage={null}
                    nickname='탈퇴한 사용자입니다.'
                    content={post.post.content}
                    img={post.post.img}
                    scrap={post.scrap}
                    likeState={post.likeState}
                    likeCount={post.post.likeCount}
                    commentCount={post.post.commentCount}
                    createdAt={post.post.createdAt}
                    postId={post.post._id}
                    introduction={null}
                  />
                );
              } else {
                // 유효하지 않은 구조를 가진 항목은 렌더링하지 않음
                return null;
              }
            })}
            {post.length !== 0 && (
              <div
                ref={ref}
                style={{ position: 'absolute', bottom: 0 }}
                // style={{ position: 'absolute', width: '120rem', height: '1rem', background: 'red', bottom: 0 }}
              />
            )}
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
  position: relative;
  width: 27.4rem;
  height: 4.5rem;
  font-size: var(--fs-lg);
  font-weight: 700;
  color: var(--btn-text-color);
  border-radius: 8px;
  background: var(--main-btn-color);

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ModalSVGWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: right;
  align-items: center;
  top: 0;
  right: 2rem;
`;

const SearchInput = styled.input`
  width: 56.2rem;
  height: 4.5rem;
  border: 2px solid var(--sub-btn-color);
  border-radius: 40px;
  padding: 1rem 1.5rem;
  font-size: var(--fs-md);

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

// search 아이콘
const SearchSVGWrapper = styled.div`
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

// 등록된 게시물 없을 때
const EmptyPostMessage = styled.p`
  width: 100%;
  height: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-sm);
`;
