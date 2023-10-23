import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContextStore } from '../../../context/AuthContext';
import useModal from '../../../hooks/useModal';
import Modal from '../../../components/common/modal/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';
import LocalSVGSprite from '../../../components/SVGSprite/LocalSVGSprite';

const MyComments = () => {
  const { userId } = useContext(AuthContextStore);
  const navigate = useNavigate();
  const [comments, setComments] = useState();
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [deleteModalOpen, toggleDeleteModal, firstDeleteRef, secondDeleteRef] = useModal();

  const getMyComments = useCallback(() => {
    if (userId) {
      API(`${ENDPOINT.MY_COMMENTS}`, 'GET')
        .then((res) => {
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

  const onClickRemoveHandler = (comment) => {
    if (userId === comment.user) {
      API(`${ENDPOINT.COMMENTS}/${comment._id}`, 'DELETE')
        .then(() => {
          getMyComments();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toggleDeleteModal();
      alert('내가 쓴 댓글만 삭제할 수 있습니다.');
    }
  };

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
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <CommentContainer key={comment._id}>
                <CommentInfoDiv>
                  <TitleInfoP
                    onClick={() => {
                      onClickMovePageHandler(comment.post._id);
                    }}
                  >
                    {comment.post.title}
                  </TitleInfoP>
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
                </CommentInfoDiv>
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
          })
        ) : (
          <NoCommentsMessage>작성한 댓글이 없습니다.</NoCommentsMessage>
        )}
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

const CommentInfoDiv = styled.div`
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

const NoCommentsMessage = styled.p`
  text-align: center;
  font-size: var(--fs-md);
  color: var(--sub-text-color);
`;
