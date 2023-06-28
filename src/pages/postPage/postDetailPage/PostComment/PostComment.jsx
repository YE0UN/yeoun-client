import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import kebabIcon from '../../../../assets/images/kebab-icon.svg';
import sendIcon from '../../../../assets/images/send-icon.svg';
import sendFillIcon from '../../../../assets/images/send-fill-icon.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PostComment = ({ profileImage, nickname, comment, createdAt }) => {
  const params = useParams();
  const navigate = useNavigate();

  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${nickname} 이미지`;

  // 더보기 버튼 클릭 시 기능구현
  const [showModal, setShowModal] = useState(false);

  const onClickRemoveHandler = () => {
    setShowModal((cur) => !cur);
    // 삭제 기능이 들어갈 위치
    console.log('삭제 기능');
  };

  // 댓글 작성 시 기능구현
  const [commentValue, setCommentValue] = useState('');
  // console.log(commentValue);

  const onChangeCommentInputHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const onClickSendHandler = () => {
    console.log('댓글 전송 기능이 들어갈 위치 입니다.');
  };

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>
        {/* 여기서부터 */}
        <CommentContainer>
          <CommentInfoDIv>
            <ProfileInfoDiv>
              <ProfileImg src={profileImage ? profileImage : userIcon} alt={ProfileImgAlt} />
              {/* <ProfileImg src={profileImage} alt={ProfileImgAlt} /> */}
              <UserNameP>{nickname}</UserNameP>
            </ProfileInfoDiv>
            <MoreButton src={kebabIcon} alt='더 보기 버튼' onClick={onClickRemoveHandler} />
            {showModal && <Modal onClick={onClickRemoveHandler}>삭제</Modal>}
          </CommentInfoDIv>
          <CommentP>{comment}</CommentP>
          <ContentInfo>
            <PostDateSpan>{createdAt}</PostDateSpan>
          </ContentInfo>
        </CommentContainer>
        {/* 여기까지 */}
        <CommentInputWrapper>
          <CommentInput
            type='text'
            placeholder='댓글 작성'
            onChange={onChangeCommentInputHandler}
            value={commentValue}
          />
          <SendImg
            src={commentValue ? sendFillIcon : sendIcon}
            alt='댓글 작성하기 아이콘'
            className={commentValue ? 'active' : ''}
            onClick={commentValue ? onClickSendHandler : undefined}
          />
        </CommentInputWrapper>
      </Article>
    </>
  );
};

export default PostComment;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 3rem 3rem 2rem;
  width: 58rem;
  height: 80rem;
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  background: var(--main-bg-color);
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
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
  background: var(--profile-bg-color);
`;

const UserNameP = styled.p`
  font-size: var(--fs-sm);
  font-weight: 500;
`;

const MoreButton = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;

const Modal = styled.div`
  position: absolute;
  top: 6rem;
  right: 0.4rem;
  width: 4rem;
  height: 2rem;
  color: #ffffff;
  background: var(--modal-sub-bg-color);
  border-radius: 4px;
  text-align: center;
  font-size: var(--fs-xs);
  line-height: 2rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
`;

const CommentP = styled.p`
  font-size: var(--fs-xs);
  height: 6rem;
  background: #ffffff;
  border-radius: 8px;
  line-height: 2.1rem;
  padding: 0.6rem 0.8rem;
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--comment-border-color);
`;

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;

const CommentInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const SendImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  cursor: ${({ className }) => (className === 'active' ? 'pointer' : 'default')};
`;
