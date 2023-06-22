import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../assets/images/user-icon.svg';
import bookMarkIcon from '../../../assets/images/bookmark-icon.svg';
import bookMarkFillIcon from '../../../assets/images/bookmark-fill-icon.svg';
import heartIcon from '../../../assets/images/heart-icon.svg';
import heartFillIcon from '../../../assets/images/heart-fill-icon.svg';
import commentIcon from '../../../assets/images/comment-icon.svg';

const Post = ({ bookMark, profileImage, userName, content, postImage, likeCount, commentCount, postDate }) => {
  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${userName} 이미지`;

  // 스크랩 기능
  const [isBookMarked, setIsBookMarked] = useState(false);
  const bookMarkState = {
    true: bookMarkFillIcon,
    false: bookMarkIcon,
  };

  // 좋아요 기능
  const [isLiked, setIsLiked] = useState(false);
  const heartIconState = {
    true: heartFillIcon,
    false: heartIcon,
  };

  // 좋아요 카운트 기능
  const [likeCountSpan, setLikeCountSpan] = useState(2);

  return (
    <>
      <Article>
        <h3 className='sr-only'>{userName}의 Post</h3>
        <BookMark
          src={bookMarkState[isBookMarked]}
          alt='스크랩'
          onClick={() => {
            setIsBookMarked((cur) => !cur);
          }}
        />
        <ProfileInfoDiv>
          <ProfileImg src={userIcon} alt={ProfileImgAlt} />
          <UserNameP>{userName}</UserNameP>
        </ProfileInfoDiv>
        <ContentP className='ellipsis'>
          가나다가나다가나다가나다가나다가나다가다가나다가나다가나다가나다가나다가다가나다가나다가나다가나다가나다가나다가나다가나다가나다가가나다라라가나다가나다가나다가가나다라마가나다라가나다라마가마나다라마바가나라나다라마가마나다라마바가
        </ContentP>
        <ContentImg src={'https://source.unsplash.com/random/?trip'} />
        <ContentInfo>
          <Container>
            <LikeWrapper>
              <img
                src={heartIconState[isLiked]}
                alt='좋아요 아이콘'
                onClick={() => {
                  setIsLiked((cur) => !cur);
                  setLikeCountSpan((cur) => (isLiked ? cur - 1 : cur + 1));
                }}
              />
              <span>{likeCountSpan}</span>
            </LikeWrapper>
            <CommentWrapper>
              <img src={commentIcon} alt='댓글 아이콘' />
              <span>5</span>
            </CommentWrapper>
          </Container>
          <PostDateSpan>2023년 06월 28일</PostDateSpan>
        </ContentInfo>
      </Article>
    </>
  );
};

export default Post;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
  padding: 2rem 2rem 1.8rem;
  width: 38rem;
  height: 50rem;
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  background: var(--main-bg-color);
`;

const BookMark = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.4rem;
  height: 3.2rem;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: var(--profile-bg-color);
`;

const UserNameP = styled.p`
  font-size: var(--fs-lg);
  font-weight: 500;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ContentP = styled.p`
  font-size: var(--fs-sm);
`;

const ContentImg = styled.img`
  width: 100%;
  height: 30rem;
  border-radius: 30px;
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--sub-text-color);
  cursor: pointer;
`;
const CommentWrapper = styled(LikeWrapper)``;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;
