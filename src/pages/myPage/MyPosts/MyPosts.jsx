import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContextStore } from '../../../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import Post from '../../../components/common/post/Post/Post';
import Loading from '../../../components/Loading/Loading';

const MyPosts = () => {
  const { userId } = useContext(AuthContextStore);

  const [isLoading, setIsLoading] = useState(false);

  // 내가 쓴 게시물 전체 상태관리
  const [post, setPost] = useState([]);
  // console.log(post);

  const getMyPosts = useCallback(() => {
    const option = {
      url: `http://localhost:3000/users/${userId}/posts`,
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
  }, [userId]);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  return (
    <>
      {isLoading ? (
        <PostContainer>
          {post.map((post, index) => {
            return (
              <Post
                key={post.post._id}
                profileImage={post.post.user.profileImage}
                nickname={post.post.user.nickname}
                introduction={post.post.user.introduction}
                bookMark={''}
                content={post.post.content}
                img={post.post.img}
                likeState={post.likeState}
                likeCount={post.post.likeCount}
                commentCount={post.post.commentCount}
                comment={''}
                createdAt={post.post.createdAt}
                postId={post.post._id}
              />
            );
          })}
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
