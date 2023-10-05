import React, { useCallback, useEffect, useState } from 'react';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';
import Post from '../../../components/common/post/Post/Post';
import styled from 'styled-components';
import useModal from '../../../hooks/useModal';
import CategoryEditModal from './../../../components/common/modal/CategoryEditModal/CategoryEditModal';
import Modal from '../../../components/common/modal/Modal/Modal';
import LocalSVGSprite from '../../../components/SVGSprite/LocalSVGSprite';

const MyScrapedPosts = () => {
  const [scrapList, setScrapList] = useState([]);
  const [changeName, setChangeName] = useState('');
  const [collectionId, setCollectionId] = useState();

  const getLikeState = () => {
    setScrapList([]);
    getMyScrapList();
  };

  // 스크랩 목록 가져오기
  const getMyScrapList = useCallback(() => {
    API(`${ENDPOINT.MY_SCRAPS}`, 'GET')
      .then((res) => {
        setScrapList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMyScrapList();
  }, [getMyScrapList]);

  // 카테고리(컬렉션) 이름 변경
  const getNameValue = (value) => {
    setChangeName(value);
  };

  const handleChangeName = (collectionId) => {
    API(`${ENDPOINT.COLLECTIONS}/${collectionId}`, 'PUT', { name: changeName })
      .then((res) => {
        getMyScrapList();
        toggle();
      })
      .catch((err) => {
        if (err.response.data.error === '이미 사용 중인 이름입니다.') {
          alert('이미 사용 중인 이름입니다.');
        }
      });
  };

  // 카테고리(컬렉션) 삭제
  const handleRemoveCategory = (collectionId) => {
    API(`${ENDPOINT.COLLECTIONS}/${collectionId}`, 'DELETE')
      .then((res) => {
        getMyScrapList();
      })
      .catch((err) => console.log(err));
  };

  // 카테고리 편집
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  // 카테고리 삭제
  const [DeleteModalOpen, DeleteToggle, DeleteFirstRef, DeleteSecondRef] = useModal();

  return (
    <>
      <Container>
        {scrapList &&
          scrapList.map((category, index) => (
            <SectionWrapper key={category.name}>
              <CategoryNameWrapper>
                <H3>{category.name}</H3>
                <LocalSVGSprite
                  id='edit-icon'
                  color='transparent'
                  width='2rem'
                  height='2rem'
                  ariaLabel='편집 아이콘'
                  onClickHandler={() => {
                    toggle();
                    setCollectionId(category.collectionId);
                    setChangeName(category.name);
                  }}
                  $ref={firstRef}
                />

                {modalOpen && collectionId === category.collectionId && (
                  <CategoryEditModal
                    toggle={toggle}
                    secondRef={secondRef}
                    confirm={() => handleChangeName(category.collectionId)}
                    initialName={category.name}
                    getNameValue={getNameValue}
                  />
                )}
              </CategoryNameWrapper>
              <Section isFirstSection={index === 0}>
                <DeleteSVGWrapper>
                  <LocalSVGSprite
                    id='delete-icon'
                    ariaLabel='삭제 아이콘'
                    onClickHandler={() => {
                      DeleteToggle();
                      setCollectionId(category.collectionId);
                    }}
                    $ref={DeleteFirstRef}
                  />
                </DeleteSVGWrapper>

                {DeleteModalOpen && collectionId === category.collectionId && (
                  <Modal
                    toggle={DeleteToggle}
                    secondRef={DeleteSecondRef}
                    confirm={() => handleRemoveCategory(category.collectionId)}
                    modalHeading='정말로 삭제하시겠습니까?'
                  />
                )}
                <PostContainer>
                  {category.posts.length ? (
                    category.posts.map((item) => (
                      <Post
                        key={item.post._id}
                        profileImage={item.post.user.profileImage}
                        nickname={item.post.user.nickname}
                        introduction={item.post.user.introduction}
                        scrap={item.scrap}
                        content={item.post.content}
                        img={item.post.img}
                        likeState={item.likeState}
                        likeCount={item.post.likeCount}
                        commentCount={item.post.commentCount}
                        createdAt={item.post.createdAt}
                        postId={item.post._id}
                        getMyScrapList={getMyScrapList}
                        getLikeState={getLikeState}
                      />
                    ))
                  ) : (
                    <P>아직 스크랩된 게시물이 없습니다.</P>
                  )}
                </PostContainer>
              </Section>
            </SectionWrapper>
          ))}
      </Container>
    </>
  );
};

export default MyScrapedPosts;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;
`;

const SectionWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 15rem;
  padding-bottom: 0.6rem;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  background-color: var(--my-scrap-list-bg-color);
`;

const Section = styled.section`
  padding-bottom: 1rem;

  // 스크롤 기능
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 2.4rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #94afc6;
    border: 0.5rem solid var(--my-scrap-list-bg-color);
    border-radius: 2rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const DeleteSVGWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.9rem;
  width: max-content;
`;

const P = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs-sm);
  color: var(--sub-text-color);
`;

const CategoryNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 2.4rem;
`;

const H3 = styled.h3`
  font-size: var(--fs-3xl);
  font-weight: 500;
`;
