import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextStore } from './../../../../context/AuthContext';
import useModal from '../../../../hooks/useModal';
import ProfileModal from '../../../../components/common/modal/ProfileModal/ProfileModal';
import useFormattedDate from '../../../../hooks/useFormattedDate';
import ScrapModal from '../../../../components/common/modal/ScrapModal/ScrapModal';
import API from '../../../../api/API';
import ENDPOINT from '../../../../api/ENDPOINT';
import LocalSVGSprite from '../../../../components/SVGSprite/LocalSVGSprite';

const PostContent = ({
  profileImage,
  nickname,
  introduction,
  scrap,
  title,
  content,
  img,
  likeState,
  likeCount,
  commentCount,
  createdAt,
  postUserId,
  postId,
}) => {
  const { userId } = useContext(AuthContextStore);

  const params = useParams();
  const navigate = useNavigate();

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
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

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
          <EditSVGWrapper>
            <LocalSVGSprite
              id='edit-icon'
              color='transparent'
              ariaLabel='게시물 수정 아이콘'
              onClickHandler={() => {
                navigate(`/post/edit/${params.postId}`);
              }}
            />
          </EditSVGWrapper>
        ) : (
          <></>
        )}

        <SVGScrapWrapper>
          <LocalSVGSprite
            id={isBookMarked ? 'bookmark-fill-icon' : 'bookmark-icon'}
            ariaLabel={isBookMarked ? '스크랩이 된 상태의 아이콘' : '스크랩 되지 않은 상태의 아이콘'}
            onClickHandler={() => {
              if (nickname === '탈퇴한 사용자입니다.') {
                alert('탈퇴한 사용자의 게시물을 스크랩할 수 없습니다.');
              } else {
                toggleScrapModal();
              }
            }}
            $ref={firstScrapRef}
          />
        </SVGScrapWrapper>
        <ProfileInfoDiv>
          <ProfileImg
            src={profileImage ? profileImage : userIcon}
            alt={ProfileImgAlt}
            onClick={toggleProfileModal}
            onError={(e) => {
              e.target.src = userIcon;
            }}
            ref={firstProfileRef}
            profileImage={profileImage && !profileImage.includes('/user-icon')}
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
              <LocalSVGSprite
                id={isLiked ? 'heart-fill-icon' : 'heart-icon'}
                color='transparent'
                width='2.4rem'
                height='2.4rem'
                ariaLabel={isLiked ? '좋아요가 활성화된 좋아요 아이콘' : '좋아요가 비활성화된 좋아요 아이콘'}
                onClickHandler={() => {
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
            <CommentWrapper>
              <LocalSVGSprite
                id='comment-icon'
                color='transparent'
                width='2.4rem'
                height='2.4rem'
                ariaLabel='댓글 아이콘'
                cursor='initial'
              />
              <span>{commentCount}</span>
            </CommentWrapper>
          </Container>
          <PostDateSpan>{formattedDate}</PostDateSpan>
        </ContentInfo>
      </Article>
      {ScrapModalOpen ? (
        <ScrapModal
          toggle={toggleScrapModal}
          secondRef={secondScrapRef}
          postId={postId}
          setIsBookMarked={setIsBookMarked}
        />
      ) : (
        <></>
      )}
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

const EditSVGWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 6rem;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
`;

const SVGScrapWrapper = styled.div`
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
  background: ${(props) => (props.profileImage ? 'initial' : 'var(--profile-bg-color)')};
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
  gap: 0.4rem;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--sub-text-color);
`;
const CommentWrapper = styled(LikeWrapper)`
  gap: 0.2rem;
`;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;
