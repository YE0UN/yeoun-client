import React, { useCallback, useContext, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import PostContent from './PostContent/PostContent';
import PostComment from './PostComment/PostComment';
import { useParams } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './../../../components/Loading/Loading';

const PostDetailPage = () => {
  const { userId } = useContext(AuthContextStore);
  const params = useParams();

  // 로딩 중
  const [isLoading, setIsLoading] = useState(false);

  // 게시물 내용 상태값
  const [postContent, setPostContent] = useState(null);

  // 서버에서 게시물 데이터 가져오기
  const GetPostInfo = useCallback(async () => {
    const option = {
      url: `http://localhost:3000/posts/${params.postId}`,
      method: 'GET',
    };

    try {
      const res = await axios(option);
      console.log(res.data);
      setPostContent(res.data);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
      setIsLoading(true);
    }
  }, [params.postId]);

  useEffect(() => {
    GetPostInfo();
  }, [userId, GetPostInfo]);

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='게시물 상세' />
        {postContent && isLoading ? (
          <PostLayout>
            <PostContent
              profileImage={postContent.post.user.profileImage}
              nickname={postContent.post.user.nickname}
              introduction={postContent.post.user.introduction}
              bookMark={''}
              title={postContent.post.title}
              content={postContent.post.content}
              img={postContent.post.img}
              like={''}
              commentCount={postContent.post.commentCount}
              createdAt={postContent.post.createdAt}
              postUserId={postContent.post.user._id}
            />
            <PostComment
              nickname={postContent.post.user.nickname}
              comments={postContent.post.comments}
              postId={postContent.post._id}
              GetPostInfo={GetPostInfo}
            />
          </PostLayout>
        ) : (
          <Loading description='데이터를 불러오는 중입니다...' margin='20rem' />
        )}
      </InnerLayout>
    </>
  );
};

export default PostDetailPage;

const PostLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  margin: 5rem 0;
`;
