import React, { useContext, useEffect, useState } from 'react';
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
  useEffect(() => {
    const GetPostInfo = async () => {
      const option = {
        url: `http://localhost:3000/posts/${params.postId}`,
        method: 'GET',
      };

      await axios(option)
        .then((res) => {
          setPostContent(res.data);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(true);
        });
    };
    GetPostInfo();
  }, [userId, params]);

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='게시물 상세' />
        {postContent && isLoading ? (
          <PostLayout>
            <PostContent
              profileImage={postContent.user.profileImage}
              nickname={postContent.user.nickname}
              introduction={postContent.user.introduction}
              bookMark={''}
              title={postContent.title}
              content={postContent.content}
              img={postContent.img}
              like={''}
              comment={''}
              createdAt={''}
              postUserId={postContent.user._id}
            />
            <PostComment profileImage={''} nickname={'익명'} comment={'댓글 테스트'} createdAt={'2023년 06월 28일'} />
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
