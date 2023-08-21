import React, { useCallback, useEffect, useState } from 'react';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';
import Post from '../../../components/common/post/Post/Post';
import styled from 'styled-components';
import deleteIcon from '../../../assets/images/delete-icon.svg';
import editIcon from '../../../assets/images/edit-icon.svg';
import useModal from '../../../hooks/useModal';
import CategoryEditModal from './../../../components/common/modal/CategoryEditModal/CategoryEditModal';

const MyScrapedPosts = () => {
  const [scrapList, setScrapList] = useState([]);
  const [changeName, setChangeName] = useState('');
  const [collectionId, setCollectionId] = useState();
  console.log(scrapList);

  // 스크랩 목록 가져오기
  const getMyScrapList = useCallback(() => {
    API(`${ENDPOINT.MY_SCRAPS}`, 'GET')
      .then((res) => {
        setScrapList([...res.data]);
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
      .catch((err) => console.log(err));
  };

  // 카테고리(컬렉션) 삭제
  const handleRemoveCategory = (collectionId) => {
    API(`${ENDPOINT.COLLECTIONS}/${collectionId}`, 'DELETE')
      .then((res) => {
        getMyScrapList();
      })
      .catch((err) => console.log(err));
  };

  // useModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  return (
    <>
      <Container>
        {scrapList &&
          scrapList.map((category, index) => (
            <Section key={category.name} isFirstSection={index === 0}>
              <DeleteImg
                src={deleteIcon}
                onClick={() => {
                  handleRemoveCategory(category.collectionId);
                }}
              />
              <CategoryNameWrapper>
                <H3>{category.name}</H3>
                <EditImg
                  src={editIcon}
                  alt='편집 아이콘'
                  onClick={() => {
                    toggle();
                    setCollectionId(category.collectionId);
                  }}
                  ref={firstRef}
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
                    />
                  ))
                ) : (
                  <P>아직 스크랩된 게시물이 없습니다.</P>
                )}
              </PostContainer>
            </Section>
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

const Section = styled.section`
  position: relative;
  min-height: 15rem;
  border-radius: 2.5rem;
  border: 1px solid var(--border-color);
  background-color: var(--my-scrap-list-bg-color);
`;

const DeleteImg = styled.img`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
`;

const P = styled.p`
  width: 100%;
  text-align: center;
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

const EditImg = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
