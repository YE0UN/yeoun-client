import React, { useCallback, useEffect, useState } from 'react';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';
import Post from '../../../components/common/post/Post/Post';
import styled from 'styled-components';
import deleteIcon from '../../../assets/images/delete-icon.svg';

const MyScrapedPosts = () => {
  const [scrapList, setScrapList] = useState([]);

  // 스크랩 목록 가져오기
  const getMyScrapList = useCallback(() => {
    API(`${ENDPOINT.MY_SCRAPS}`, 'GET')
      .then((res) => {
        console.log(res);
        setScrapList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getMyScrapList();
  }, [getMyScrapList]);

  // 카테고리(컬렉션) 삭제
  const handleRemoveCategory = (collecntionId) => {
    console.log(collecntionId);

    API(`${ENDPOINT.COLLECTIONS}/${collecntionId}`, 'DELETE')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        {scrapList &&
          scrapList.map((category, index) => (
            <Section key={category.name} isFirstSection={index === 0}>
              <DeleteImg
                src={deleteIcon}
                onClick={() => {
                  handleRemoveCategory(category);
                }}
              />
              <H3>{category.name}</H3>
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

const H3 = styled.h3`
  margin: 2.4rem;
  font-size: var(--fs-3xl);
  font-weight: 500;
`;
