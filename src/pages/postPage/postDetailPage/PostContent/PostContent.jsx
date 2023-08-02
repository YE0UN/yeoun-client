import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import editIcon from '../../../../assets/images/edit-icon.svg';
import bookMarkIcon from '../../../../assets/images/bookmark-icon.svg';
import bookMarkFillIcon from '../../../../assets/images/bookmark-fill-icon.svg';
import heartIcon from '../../../../assets/images/heart-icon.svg';
import heartFillIcon from '../../../../assets/images/heart-fill-icon.svg';
import commentIcon from '../../../../assets/images/comment-icon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextStore } from './../../../../context/AuthContext';
import useModal from '../../../../hooks/useModal';
import ProfileModal from '../../../../components/common/modal/ProfileModal/ProfileModal';
import useFormattedDate from '../../../../hooks/useFormattedDate';
import useImagePreload from '../../../../hooks/useImagePreload';
import ScrapModal from '../../../../components/common/modal/ScrapModal/ScrapModal';

const PostContent = ({
  profileImage,
  nickname,
  introduction,
  bookMark,
  title,
  content,
  img,
  like,
  comment,
  commentCount,
  createdAt,
  postUserId,
}) => {
  const { userId } = useContext(AuthContextStore);

  const params = useParams();
  const navigate = useNavigate();

  // useImagePreload
  useImagePreload([editIcon, bookMarkFillIcon, heartFillIcon]);

  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${nickname} 이미지`;

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
  const [likeCountSpan, setLikeCountSpan] = useState(0);

  // useModal
  const [profileModalOpen, toggleProfileModal, firstProfileRef, secondProfileRef] = useModal();
  const [ScrapModalOpen, toggleScrapModal, firstScrapRef, secondScrapRef] = useModal();

  // 서버의 createdAt 형식 변환을 위한 커스텀 훅 사용 useFormattedDate
  const formattedDate = useFormattedDate(createdAt);

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>

        {postUserId === userId ? (
          <Edit
            src={editIcon}
            alt='게시물 수정 아이콘'
            onClick={() => {
              navigate(`/post/edit/${params.postId}`);
            }}
          ></Edit>
        ) : (
          <></>
        )}

        <BookMark
          src={bookMarkState[isBookMarked]}
          alt='스크랩'
          onClick={() => {
            setIsBookMarked((cur) => !cur);
            !isBookMarked && toggleScrapModal();
          }}
          ref={firstScrapRef}
        />
        <ProfileInfoDiv>
          <ProfileImg
            src={profileImage ? profileImage : userIcon}
            alt={ProfileImgAlt}
            onClick={toggleProfileModal}
            onError={(e) => {
              e.target.src = userIcon;
            }}
            ref={firstProfileRef}
          />
          <UserNameP onClick={toggleProfileModal} ref={firstProfileRef}>
            {nickname}
          </UserNameP>
          {profileModalOpen && (
            <ProfileModal
              toggle={toggleProfileModal}
              secondRef={secondProfileRef}
              profileImage={profileImage}
              ProfileImgAlt={ProfileImgAlt}
              nickname={nickname}
              introduction={introduction}
            />
          )}
        </ProfileInfoDiv>
        <ContentTitle>{title}</ContentTitle>
        <ContentP>{content}</ContentP>
        {img !== null ? (
          <ContentImg
            src={img}
            alt=''
            onError={(e) => {
              e.target.src = 'https://picsum.photos/600/600/?random';
            }}
          />
        ) : (
          <ContentImg src={'https://picsum.photos/600/600/?random'} alt='' />
        )}

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
              <span>{commentCount}</span>
            </CommentWrapper>
          </Container>
          <PostDateSpan>{formattedDate}</PostDateSpan>
        </ContentInfo>
      </Article>
      {ScrapModalOpen ? <ScrapModal toggle={toggleScrapModal} secondRef={secondScrapRef} /> : <></>}
    </>
  );
};

export default PostContent;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
  padding: 3rem 3rem 1rem;
  width: 58rem;
  height: 80rem;
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  background: var(--main-bg-color);
`;

const Edit = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 6rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const BookMark = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 3.8rem;
  height: 5rem;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: var(--profile-bg-color);
  cursor: pointer;
`;

const UserNameP = styled.p`
  font-size: var(--fs-lg);
  font-weight: 500;
  cursor: pointer;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const ContentTitle = styled.p`
  font-size: var(--fs-md);
  font-weight: 700;
  height: 2.5rem;
  background: #ffffff;
  border-radius: 8px;
  line-height: 2.5rem;
  padding: 0 0.8rem;
`;

const ContentP = styled.p`
  font-size: var(--fs-xs);
  height: 18rem;
  background: #ffffff;
  border-radius: 8px;
  line-height: 2.1rem;
  padding: 0.6rem 0.8rem;
  overflow: auto;
`;

const ContentImg = styled.img`
  width: 52rem;
  height: 38rem;
  border: 0;
  border-radius: 30px;
  background: #ffffff;
  object-fit: cover;
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
