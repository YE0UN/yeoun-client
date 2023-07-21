import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
// import kebabIcon from '../../../../assets/images/kebab-icon.svg';
import deleteIcon from '../../../../assets/images/delete-icon.svg';
import sendIcon from '../../../../assets/images/send-icon.svg';
import sendFillIcon from '../../../../assets/images/send-fill-icon.svg';
import axios from 'axios';
import { AuthContextStore } from '../../../../context/AuthContext';
import useModal from '../../../../hooks/useModal';
import Modal from '../../../../components/common/modal/Modal/Modal';

const PostComment = ({ nickname, postId, comments, GetPostInfo }) => {
  const { userId } = useContext(AuthContextStore);

  // 댓글 삭제 기능
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const onClickRemoveHandler = (comment) => {
    if (userId === comment.user._id) {
      const option = {
        url: `http://localhost:3000/comments/${comment._id}`,
        method: 'DELETE',
        data: { userId: userId },
      };
      axios(option)
        .then((res) => {
          console.log(res);
          GetPostInfo();
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      alert('내가 쓴 댓글만 삭제할 수 있습니다.');
    }
  };

  // 댓글 작성 시 기능구현
  const [commentValue, setCommentValue] = useState('');

  const onChangeCommentInputHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const onClickSendHandler = () => {
    const option = {
      url: `http://localhost:3000/comments/${postId}`,
      method: 'POST',
      data: { content: commentValue, userId: userId },
    };
    commentValue &&
      axios(option)
        .then((res) => {
          console.log(res);
          GetPostInfo();
          setCommentValue('');
        })
        .catch((res) => {
          console.log(res);
        });
  };

  // useModal
  const [openModal, toggle, firstRef, secondRef] = useModal();

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>
        {/* 여기서부터 */}
        <ScrollbarLayout>
          {comments &&
            comments.map((comment) => {
              return (
                <CommentContainer key={comment._id}>
                  <CommentInfoDIv>
                    <ProfileInfoDiv>
                      <ProfileImg
                        src={comment.user.profileImage ? comment.user.profileImage : userIcon}
                        alt={comment.user.nickname}
                      />
                      <UserNameP>{comment.user.nickname}</UserNameP>
                    </ProfileInfoDiv>
                    <DeleteButton
                      src={deleteIcon}
                      alt='삭제 아이콘'
                      onClick={() => {
                        toggle();
                        setDeleteCommentId(comment._id);
                      }}
                      ref={firstRef}
                    />
                    {openModal && deleteCommentId === comment._id && (
                      <Modal
                        toggle={toggle}
                        secondRef={secondRef}
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
          {/* 여기까지 */}
        </ScrollbarLayout>
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
            onClick={onClickSendHandler}
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
  background: var(--profile-bg-color);
`;

const UserNameP = styled.p`
  font-size: var(--fs-sm);
  font-weight: 500;
`;

const DeleteButton = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
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

const SendImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 3rem;
  cursor: ${({ className }) => (className === 'active' ? 'pointer' : 'default')};
`;
