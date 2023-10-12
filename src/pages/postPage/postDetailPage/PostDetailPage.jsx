import React, { useCallback, useContext, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import PostContent from './PostContent/PostContent';
import PostComment from './PostComment/PostComment';
import { useParams } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import styled from 'styled-components';
import Loading from './../../../components/Loading/Loading';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

const PostDetailPage = () => {
  const { userId } = useContext(AuthContextStore);
  const params = useParams();

  // 로딩 중
  const [isLoading, setIsLoading] = useState(false);

  // 게시물 내용 상태값
  const [postContent, setPostContent] = useState(null);

  // 서버에서 게시물 데이터 가져오기
  const GetPostInfo = useCallback(() => {
    API(`${ENDPOINT.POSTS}/${params.postId}`, 'GET')
      .then((res) => {
        setPostContent(res.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(true);
      });
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
              profileImage={postContent.post.user ? postContent.post.user.profileImage : null}
              nickname={postContent.post.user ? postContent.post.user.nickname : '탈퇴한 사용자입니다.'}
              introduction={postContent.post.user ? postContent.post.user.introduction : null}
              scrap={postContent.scrap}
              title={postContent.post.title}
              content={postContent.post.content}
              img={postContent.post.img}
              likeState={postContent.likeState}
              likeCount={postContent.post.likeCount}
              commentCount={postContent.post.commentCount}
              createdAt={postContent.post.createdAt}
              postUserId={postContent.post.user ? postContent.post.user._id : null}
              postId={postContent.post._id}
            />
            <PostComment
              nickname={postContent.post.user ? postContent.post.user.nickname : '탈퇴한 사용자입니다.'}
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
