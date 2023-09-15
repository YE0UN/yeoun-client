import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import bookMarkIcon from '../../../../assets/images/bookmark-icon.svg';
import bookMarkFillIcon from '../../../../assets/images/bookmark-fill-icon.svg';
import heartIcon from '../../../../assets/images/heart-icon.svg';
import heartFillIcon from '../../../../assets/images/heart-fill-icon.svg';
import commentIcon from '../../../../assets/images/comment-icon.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../../context/AuthContext';
import useFormattedDate from './../../../../hooks/useFormattedDate';
import useImagePreload from '../../../../hooks/useImagePreload';
import useModal from '../../../../hooks/useModal';
import ScrapModal from '../../modal/ScrapModal/ScrapModal';
import API from '../../../../api/API';
import ENDPOINT from '../../../../api/ENDPOINT';

const Post = ({
  profileImage,
  nickname,
  scrap,
  content,
  img,
  likeState,
  likeCount,
  commentCount,
  createdAt,
  postId,
  introduction,
  getMyScrapList,
  getLikeState,
}) => {
  const { userId } = useContext(AuthContextStore);
  const navigate = useNavigate();

  // image preload
  useImagePreload([bookMarkFillIcon, heartFillIcon]);

  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${nickname} 이미지`;

  // 스크랩 기능
  const [isBookMarked, setIsBookMarked] = useState(scrap);

  // 좋아요 기능
  const [isLiked, setIsLiked] = useState(likeState);

  // 좋아요 카운트 기능
  const [likeCountSpan, setLikeCountSpan] = useState(likeCount);

  // 좋아요
  const togglelikeState = () => {
    API(`${ENDPOINT.LIKE}/${postId}`, 'POST')
      .then((res) => {
        console.log(res);
        getLikeState && getLikeState();
      })
      .catch((res) => {
        console.log(res);
      });
  };

  // 게시물 내용 클릭 시, 상세 게시물 페이지로 이동
  const onClickMovePageHandler = () => {
    if (userId) {
      const newPath = `/post/${postId}`;
      navigate(newPath);
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };

  // 게시물 뒤집기
  const [isFlipped, setIsFlipped] = useState(false);
  const onClickFlipCardHandler = () => {
    setIsFlipped(!isFlipped);
  };

  // 서버의 createdAt 형식 변환을 위한 커스텀 훅 사용 useFormattedDate
  const formattedDate = useFormattedDate(createdAt);

  // useModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  return (
    <>
      <Article className={isFlipped ? 'flipped' : ''}>
        <CardFlipper>
          <CardFront flipped={isFlipped}>
            <h3 className='sr-only'>{nickname}의 Post</h3>
            <BookMark
              src={isBookMarked ? bookMarkFillIcon : bookMarkIcon}
              alt='스크랩'
              onClick={() => {
                if (nickname === '탈퇴한 사용자입니다.') {
                  alert('탈퇴한 사용자의 게시물을 스크랩할 수 없습니다.');
                } else {
                  toggle();
                }
              }}
              ref={firstRef}
            />
            <ProfileInfoDiv>
              <ProfileImg
                src={profileImage ? profileImage : userIcon}
                alt={ProfileImgAlt}
                onError={(e) => {
                  e.target.src = userIcon;
                }}
                onClick={() => {
                  if (userId) {
                    onClickFlipCardHandler();
                  } else {
                    alert('로그인 후 이용 가능합니다.');
                  }
                }}
              />
              <UserNameP
                onClick={() => {
                  if (userId) {
                    onClickFlipCardHandler();
                  } else {
                    alert('로그인 후 이용 가능합니다.');
                  }
                }}
              >
                {nickname}
              </UserNameP>
            </ProfileInfoDiv>
            <ContentP className='ellipsis' onClick={onClickMovePageHandler}>
              {content}
            </ContentP>
            {img !== null ? (
              <ContentImg
                src={img}
                alt=''
                onError={(e) => {
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
                      if (userId) {
                        if (nickname === '탈퇴한 사용자입니다.') {
                          return alert('탈퇴한 사용자의 게시물에 좋아요 할 수 없습니다.');
                        } else {
                          togglelikeState();
                          setIsLiked((cur) => !cur);
                          setLikeCountSpan((cur) => (isLiked ? cur - 1 : cur + 1));
                        }
                      } else {
                        alert('로그인 후 이용 가능합니다.');
                      }
                    }}
                  />
                  <span>{likeCountSpan}</span>
                </LikeWrapper>
                <CommentWrapper onClick={onClickMovePageHandler}>
                  <img src={commentIcon} alt='댓글 아이콘' />
                  <span>{commentCount}</span>
                </CommentWrapper>
              </Container>
              <PostDateSpan>{formattedDate}</PostDateSpan>
            </ContentInfo>
          </CardFront>
          <CardBack>
            <BackContainer>
              <ProfileImg
                className='back'
                src={profileImage ? profileImage : userIcon}
                alt={ProfileImgAlt}
                onError={(e) => {
                  e.target.src = userIcon;
                }}
              />
              <UserNameP className='back'>{nickname}</UserNameP>
              <ContentP className='back'>{introduction !== '' ? introduction : '작성된 소개 글이 없습니다.'}</ContentP>
              <BackButton type='button' onClick={onClickFlipCardHandler}>
                돌아가기
              </BackButton>
            </BackContainer>
          </CardBack>
        </CardFlipper>
      </Article>
      {modalOpen ? (
        <ScrapModal
          toggle={toggle}
          secondRef={secondRef}
          postId={postId}
          setIsBookMarked={setIsBookMarked}
          getMyScrapList={getMyScrapList}
        />
      ) : (
        <></>
      )}
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
  transform-style: preserve-3d;
  transition: transform 0.5s;
`;

// 게시물 회전 시작
const CardFlipper = styled.div`
  position: relative;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;

  ${({ flipped }) =>
    flipped &&
    `
    transform: rotateY(180deg);
  `}
`;

const CardSide = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const CardFront = styled.div`
  ${CardSide}
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CardBack = styled.div`
  ${CardSide}
  transform: rotateY(180deg);
  text-align: left;
`;
// 게시물 회전 끝

const BookMark = styled.img`
  position: absolute;
  top: -2rem;
  right: -2rem;
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
  cursor: pointer;

  &.back {
    width: 15rem;
    height: 15rem;
    cursor: default;
  }
`;

const UserNameP = styled.p`
  font-size: var(--fs-lg);
  font-weight: 500;
  cursor: pointer;

  &.back {
    cursor: default;
  }
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

  &.back {
    font-size: var(--fs-xs);
    width: 100%;
    height: 21rem;
    background: #ffffff;
    border-radius: 8px;
    line-height: 2.1rem;
    padding: 0.6rem 0.8rem;
    overflow: auto;
    cursor: default;
    &:hover {
      box-shadow: none;
    }
  }
`;

const ContentImg = styled.img`
  width: 34rem;
  height: 30rem;
  border-radius: 30px;
  background: #ffffff;
  object-fit: cover;
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

const BackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const BackButton = styled.button`
  width: 8rem;
  padding: 0.2rem;
  font-size: var(--fs-xs);
  cursor: pointer;
  border: none;
  &:hover {
    background: #c9c9c9;
    border-radius: 8px;
  }
`;
