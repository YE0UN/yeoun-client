import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import { AuthContextStore } from '../../../../context/AuthContext';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../../components/common/modal/Modal/Modal';
import ProfileModal from '../../../../components/common/modal/ProfileModal/ProfileModal';
import API from '../../../../api/API';
import ENDPOINT from '../../../../api/ENDPOINT';
import LocalSVGSprite from '../../../../components/SVGSprite/LocalSVGSprite';

const PostComment = ({ nickname, postId, comments, GetPostInfo }) => {
  const { userId } = useContext(AuthContextStore);

  // 댓글 삭제 기능
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  // 프로필 확인 기능
  const [profileCommentId, setProfileCommentId] = useState(null);

  const onClickRemoveHandler = (comment) => {
    if (userId === comment.user?._id) {
      API(`${ENDPOINT.COMMENTS}/${comment._id}`, 'DELETE')
        .then((res) => {
          GetPostInfo();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toggleDeleteModal();
      alert('내가 쓴 댓글만 삭제할 수 있습니다.');
    }
  };

  // 댓글 작성 시 기능구현
  const [commentValue, setCommentValue] = useState('');

  const onChangeCommentInputHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const onClickSendHandler = () => {
    if (!commentValue.trim().length > 0) {
      alert('의미 있는 댓글을 작성해 주세요.');
      setCommentValue('');
      return;
    }

    API(`${ENDPOINT.COMMENTS}/${postId}`, 'POST', { content: commentValue, userId: userId })
      .then((res) => {
        GetPostInfo();
        setCommentValue('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 엔터 키를 눌렀을 때 댓글 작성 클릭과 동일한 효과를 주기 위한 함수
  const onEnterKeyDownHandler = (e) => {
    if (e.key === 'Enter') {
      onClickSendHandler();
    }
  };

  // useModal
  // 프로필 확인 기능에 사용될 모달과 댓글 삭제 기능에 사용될 모달을 따로 선언하여 사용
  const [profileModalOpen, toggleProfileModal, firstProfileRef, secondProfileRef] = useModal();
  const [deleteModalOpen, toggleDeleteModal, firstDeleteRef, secondDeleteRef] = useModal();

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>
        <ScrollbarLayout>
          {comments &&
            comments.map((comment) => {
              return (
                <CommentContainer key={comment._id}>
                  <CommentInfoDIv>
                    <ProfileInfoDiv>
                      <ProfileImg
                        src={
                          comment.user === null || comment.user.profileImage.includes('/user-icon')
                            ? userIcon
                            : comment.user.profileImage
                            ? comment.user.profileImage
                            : userIcon
                        }
                        alt={comment.user === null ? '탈퇴한 사용자입니다.' : comment.user.nickname}
                        onClick={() => {
                          toggleProfileModal();
                          setProfileCommentId(comment._id);
                        }}
                        ref={firstProfileRef}
                        profileImage={comment.user?.profileImage && !comment.user?.profileImage.includes('/user-icon')}
                      />
                      <UserNameP
                        onClick={() => {
                          toggleProfileModal();
                          setProfileCommentId(comment._id);
                        }}
                        ref={firstProfileRef}
                      >
                        {comment.user === null ? '탈퇴한 사용자입니다.' : comment.user.nickname}
                      </UserNameP>
                      {profileModalOpen && profileCommentId === comment._id && (
                        <ProfileModal
                          toggle={toggleProfileModal}
                          secondRef={secondProfileRef}
                          profileImage={comment.user === null ? userIcon : comment.user.profileImage}
                          ProfileImgAlt={
                            comment.user === null ? '탈퇴한 사용자' : `&{comment.user.nickname}의 프로필 이미지`
                          }
                          nickname={comment.user === null ? '탈퇴한 사용자입니다.' : comment.user.nickname}
                          introduction={comment.user === null ? null : comment.user.introduction}
                        />
                      )}
                    </ProfileInfoDiv>
                    <LocalSVGSprite
                      id='delete-icon'
                      width='2rem'
                      height='2rem'
                      ariaLabel='댓글 삭제 아이콘'
                      onClickHandler={() => {
                        toggleDeleteModal();
                        setDeleteCommentId(comment._id);
                      }}
                      $ref={firstDeleteRef}
                    />

                    {deleteModalOpen && deleteCommentId === comment._id && (
                      <Modal
                        toggle={toggleDeleteModal}
                        secondRef={secondDeleteRef}
                        confirm={() => {
                          onClickRemoveHandler(comment);
                        }}
                        modalHeading='정말로 삭제하시겠습니까?'
                      />
                    )}
                  </CommentInfoDIv>
                  <CommentP>{comment.content}</CommentP>
                  <ContentInfo>
                    <PostDateSpan>{comment.createdAt}</PostDateSpan>
                  </ContentInfo>
                </CommentContainer>
              );
            })}
        </ScrollbarLayout>
        <CommentInputWrapper>
          <CommentInput
            type='text'
            placeholder='댓글 작성'
            onChange={onChangeCommentInputHandler}
            value={commentValue}
            maxLength={600}
            onKeyDown={onEnterKeyDownHandler}
          />
          <SVGWrapper>
            <LocalSVGSprite
              id={commentValue ? 'send-fill-icon' : 'send-icon'}
              color='transparent'
              ariaLabel='댓글 작성하기 아이콘'
              cursor={commentValue ? 'pointer' : 'default'}
              onClickHandler={onClickSendHandler}
            />
          </SVGWrapper>
        </CommentInputWrapper>
      </Article>
    </>
  );
};

export default PostComment;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 58rem;
  height: 80rem;
  padding: 3rem 0rem 0 3rem;
  background: var(--main-bg-color);
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
`;

const ScrollbarLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  width: 100%;
  height: 100%;

  // 스크롤 기능
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #94afc6;
    border: 1rem solid var(--main-bg-color);
    border-radius: 2.5rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: relative;
`;

const CommentInfoDIv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: ${(props) => (props.profileImage ? 'initial' : 'var(--profile-bg-color)')};
  cursor: pointer;
`;

const UserNameP = styled.p`
  font-size: var(--fs-sm);
  font-weight: 500;
  cursor: pointer;
`;

const CommentP = styled.p`
  font-size: var(--fs-xs);
  background: #ffffff;
  border-radius: 8px;
  line-height: 1.2;
  padding: 0.6rem 0.8rem;
  word-break: break-word;
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--comment-border-color);
`;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;

const CommentInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  background: var(--main-bg-color);
  padding: 2rem 0;
  border-radius: 0 0 2.5rem 0;
`;

const CommentInput = styled.input`
  width: 45rem;
  height: 4.5rem;
  border: 2px solid var(--input-border-color);
  font-size: var(--fs-md);
  padding: 1.5rem;
  border-radius: 8px;
  &:focus {
    outline: none;
    border: 2px solid var(--input-border-focus-color);
  }
`;

const SVGWrapper = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 3rem;
`;
