import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContextStore } from '../../../context/AuthContext';
import deleteIcon from '../../../assets/images/delete-icon.svg';
import useModal from '../../../hooks/useModal';
import Modal from '../../../components/common/modal/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const MyComments = () => {
  const { userId } = useContext(AuthContextStore);

  const navigate = useNavigate();

  const [comments, setComments] = useState();
  // console.log(comments);

  // 댓글 삭제 기능
  const [deleteCommentId, setDeleteCommentId] = useState(null);

  const getMyComments = useCallback(() => {
    if (userId) {
      const option = {
        url: `http://localhost:3000/users/${userId}/comments`,
        method: 'GET',
      };
      axios(option)
        .then((res) => {
          // console.log(res.data);
          setComments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  useEffect(() => {
    getMyComments();
  }, [getMyComments]);

  const [deleteModalOpen, toggleDeleteModal, firstDeleteRef, secondDeleteRef] = useModal();

  const onClickRemoveHandler = (comment) => {
    if (userId === comment.user) {
      const option = {
        url: `http://localhost:3000/comments/${comment._id}`,
        method: 'DELETE',
        data: { userId: userId },
      };
      axios(option)
        .then((res) => {
          console.log(res);
          getMyComments();
        })
        .catch((res) => {
          console.log(res);
        });
    } else {
      toggleDeleteModal();
      alert('내가 쓴 댓글만 삭제할 수 있습니다.');
    }
  };

  // 게시물 내용 클릭 시, 상세 게시물 페이지로 이동
  const onClickMovePageHandler = (postId) => {
    if (userId) {
      const newPath = `/post/${postId}`;
      navigate(newPath);
    } else {
      alert('로그인 후 이용 가능합니다.');
    }
  };

  return (
    <>
      <Article>
        {comments &&
          comments.map((comment) => {
            return (
              <CommentContainer key={comment._id}>
                <CommentInfoDIv>
                  <TitleInfoP
                    onClick={() => {
                      onClickMovePageHandler(comment.post._id);
                    }}
                  >
                    {comment.post.title}
                  </TitleInfoP>
                  <DeleteButton
                    src={deleteIcon}
                    alt='삭제 아이콘'
                    onClick={() => {
                      toggleDeleteModal();
                      setDeleteCommentId(comment._id);
                    }}
                    ref={firstDeleteRef}
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
                <CommentP
                  onClick={() => {
                    onClickMovePageHandler(comment.post._id);
                  }}
                >
                  {comment.content}
                </CommentP>
                <ContentInfo>
                  <PostDateSpan>{comment.createdAt}</PostDateSpan>
                </ContentInfo>
              </CommentContainer>
            );
          })}
      </Article>
    </>
  );
};

export default MyComments;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3rem;
  background: var(--main-bg-color);
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin: 0 auto 5rem;
  gap: 1rem;
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
  font-size: var(--fs-xs);
  cursor: pointer;
`;

const TitleInfoP = styled.p`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DeleteButton = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const CommentP = styled.p`
  font-size: var(--fs-xs);
  background: #ffffff;
  border-radius: 8px;
  line-height: 1.2;
  padding: 0.6rem 0.8rem;
  word-break: break-word;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
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
