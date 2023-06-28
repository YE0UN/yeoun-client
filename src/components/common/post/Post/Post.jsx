import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import bookMarkIcon from '../../../../assets/images/bookmark-icon.svg';
import bookMarkFillIcon from '../../../../assets/images/bookmark-fill-icon.svg';
import heartIcon from '../../../../assets/images/heart-icon.svg';
import heartFillIcon from '../../../../assets/images/heart-fill-icon.svg';
import commentIcon from '../../../../assets/images/comment-icon.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../../context/AuthContext';

const Post = ({ profileImage, nickname, bookMark, content, img, like, comment, createdAt, postId }) => {
  const { userId } = useContext(AuthContextStore);
  const navigate = useNavigate();

  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${nickname} 이미지`;

  // 스크랩 기능
  const [isBookMarked, setIsBookMarked] = useState(false);

  // 좋아요 기능
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 카운트 기능
  const [likeCountSpan, setLikeCountSpan] = useState(0);

  // 게시물 내용 클릭 시, 상세 게시물 페이지로 이동
  const onClickMovePageHandler = () => {
    if (userId) {
      const newPath = `/post/${postId}`;
      navigate(newPath);
      // 페이지 전환 시, 의도하지 않은 스크롤 발생 방지
      window.location.href = newPath;
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>
        <BookMark
          src={isBookMarked ? bookMarkFillIcon : bookMarkIcon}
          alt='스크랩'
          onClick={() => {
            setIsBookMarked((cur) => !cur);
          }}
        />
        <ProfileInfoDiv>
          <ProfileImg src={profileImage ? profileImage : userIcon} alt={ProfileImgAlt} />
          {/* <ProfileImg src={profileImage} alt={ProfileImgAlt} /> */}
          <UserNameP>{nickname}</UserNameP>
        </ProfileInfoDiv>
        <ContentP className='ellipsis' onClick={onClickMovePageHandler}>
          {content}
        </ContentP>
        {/* <ContentImg src={'https://source.unsplash.com/random/?trip'} /> */}
        {img !== null ? (
          <ContentImg
            src={img}
            alt=''
            onError={(e) => {
              console.log('이미지 불러오기 오류! 랜덤 이미지로 대체합니다.');
              e.target.src = 'https://picsum.photos/600/600/?random';
            }}
            onClick={onClickMovePageHandler}
          />
        ) : (
          <ContentImg src={'https://picsum.photos/600/600/?random'} alt='' onClick={onClickMovePageHandler} />
        )}

        <ContentInfo>
          <Container>
            <LikeWrapper>
              <img
                src={isLiked ? heartFillIcon : heartIcon}
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
              <span>1</span>
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
  font-size: var(--fs-xs);
  height: 5rem;
  background: #ffffff;
  border-radius: 8px;
  line-height: 2.2rem;
  padding: 0.2rem 0.8rem 0.8rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ContentImg = styled.img`
  width: 34rem;
  height: 30rem;
  border-radius: 30px;
  background: #ffffff;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
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
