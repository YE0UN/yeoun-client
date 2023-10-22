import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Post from '../../../components/common/post/Post/Post';
import Loading from '../../../components/Loading/Loading';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

const MyPosts = () => {
  const [isLoading, setIsLoading] = useState(false);

  // 내가 쓴 게시물 전체 상태관리
  const [post, setPost] = useState([]);

  const getMyPosts = useCallback(() => {
    API(`${ENDPOINT.MY_POSTS}`, 'GET')
      .then((res) => {
        setPost(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <>
      {isLoading ? (
        <PostContainer>
          {post?.length !== 0 ? (
            post.map((post, index) => {
              return (
                <Post
                  key={post.post._id}
                  profileImage={post.post.user.profileImage}
                  nickname={post.post.user.nickname}
                  introduction={post.post.user.introduction}
                  scrap={post.scrap}
                  content={post.post.content}
                  img={post.post.img}
                  likeState={post.likeState}
                  likeCount={post.post.likeCount}
                  commentCount={post.post.commentCount}
                  createdAt={post.post.createdAt}
                  postId={post.post._id}
                />
              );
            })
          ) : (
            <Description>작성한 게시글이 없습니다.</Description>
          )}
        </PostContainer>
      ) : (
        <Loading description='데이터를 불러오는 중입니다...' margin='20rem 0 10rem' />
      )}
    </>
  );
};

export default MyPosts;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 5rem;
`;

const Description = styled.span`
  font-size: var(--fs-md);
  font-weight: 500;
`;
