import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import Button from '../../Button/Button';
import photoIcon from '../../../../assets/images/photo-icon.svg';
import imageCompression from 'browser-image-compression';
import useModal from '../../../../hooks/useModal';
import Modal from '../../modal/Modal/Modal';

const UploadPost = ({
  bookMark,
  profileImage,
  nickname,
  content,
  postImage,
  likeCount,
  commentCount,

  buttonName,
  params,

  getUploadData,
  getModificationData,

  onClickPostRegistrationHandler,
  onClickPostModificationHandler,
  onClickRemovePostHandler,

  initialTitle,
  initialContent,
  initialImage,
}) => {
  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${nickname} 이미지`;

  const [title, setTitle] = useState(initialTitle ? initialTitle : '');
  const [postContent, setPostContent] = useState(initialContent ? initialContent : '');
  const [imagePreview, setImagePreview] = useState(initialImage ? initialImage : null);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);

  // 제목
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setIsTitleValid(e.target.value !== '');
  };

  // 내용
  const handleContentChange = (e) => {
    setPostContent(e.target.value);
    setIsContentValid(e.target.value !== '');
  };

  // 이미지 리사이징이 포함된 이미지 미리보기 기능
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.2, // 최대 파일 크기 (메가바이트 단위)
          maxWidthOrHeight: 1920, // 최대 폭 또는 높이 (픽셀 단위)
          maxWidth: 1920, // 최대 폭 (픽셀 단위)
          maxHeight: 1080, // 최대 높이 (픽셀 단위)
          useWebWorker: true, // 웹 워커 사용 활성화
        };

        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log('이미지 압축 에러:', error);
      }
    } else {
      setImagePreview(null);
    }
  };

  // 게시물 업로드 날짜 및 시간 가져오기
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // 새 글 작성 페이지로 데이터 보내기
  useEffect(() => {
    if (getUploadData) {
      getUploadData({ title, postContent, imagePreview });
    }
  }, [title, postContent, imagePreview, getUploadData]);

  // 글 수정 페이지로 데이터 보내기
  useEffect(() => {
    if (getModificationData) {
      getModificationData({ title, postContent, imagePreview });
    }
  }, [title, postContent, imagePreview, getModificationData]);

  // useModal
  const [openModal, toggle, firstRef, secondRef] = useModal();

  return (
    <>
      <Article>
        <h3 className='sr-only'>{nickname}의 Post</h3>
        <ProfileInfoDiv>
          <ProfileImg src={profileImage ? profileImage : userIcon} alt={ProfileImgAlt} />
          <UserNameP>{nickname}</UserNameP>
        </ProfileInfoDiv>
        <TitleInput
          type='text'
          placeholder='제목'
          maxLength='50'
          autoFocus
          value={title}
          onChange={handleTitleChange}
          isValid={isTitleValid}
        />
        <ContentTextArea
          placeholder='내용'
          maxLength='600'
          value={postContent}
          onChange={handleContentChange}
          isValid={isContentValid}
        />
        <ImageLabel htmlFor='contentImage' imagePreview={imagePreview}>
          {imagePreview === null ? '' : <ImagePreview src={imagePreview} alt='미리보기 이미지' />}
        </ImageLabel>
        <ImageInput id='contentImage' type='file' accept='image/*' onChange={handleImageChange} />

        <PostInfo>
          <SpanWrapper>
            <PostDateSpan>{getCurrentDate()}</PostDateSpan>
            {onClickRemovePostHandler ? (
              <>
                <RemoveSpan onClick={toggle} ref={firstRef}>
                  게시물 삭제하기
                </RemoveSpan>
              </>
            ) : (
              <></>
            )}
          </SpanWrapper>
          <Button
            size='md'
            onClickHandler={
              onClickPostRegistrationHandler ? onClickPostRegistrationHandler : onClickPostModificationHandler
            }
            disabled={params ? false : !isTitleValid || !isContentValid}
          >
            {buttonName ? buttonName : '작성완료'}
          </Button>
        </PostInfo>
        {openModal && (
          <Modal
            toggle={toggle}
            secondRef={secondRef}
            confirm={onClickRemovePostHandler}
            modalHeading='정말로 삭제하시겠습니까?'
          />
        )}
      </Article>
    </>
  );
};

export default UploadPost;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 3rem;
  width: 58rem;
  height: 82.5rem;
  border-radius: 25px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  background: var(--main-bg-color);
`;

const ProfileImg = styled.img`
  width: 8rem;
  height: 8rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: var(--profile-bg-color);
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const UserNameP = styled.p`
  font-size: var(--fs-2xl);
  font-weight: 500;
`;

// 제목
const TitleInput = styled.input`
  width: 100%;
  height: 4.5rem;
  border: 2px solid ${(props) => (props.isValid ? 'var(--input-border-focus-color)' : 'var(--input-border-color)')};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: var(--fs-md);
  background: #ffffff;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 내용
const ContentTextArea = styled.textarea`
  width: 100%;
  height: 15rem;
  border: 2px solid ${(props) => (props.isValid ? 'var(--input-border-focus-color)' : 'var(--input-border-color)')};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: var(--fs-md);
  background: #ffffff;

  &:focus {
    outline: none;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 이미지 미리보기
const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  display: block;
  width: 52rem;
  height: 38rem;
  border-radius: 30px;
  cursor: pointer;
  background: 97% 95% ${(props) => (props.imagePreview ? '' : `url(${photoIcon})`)} var(--image-label-bg-color)
    no-repeat;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  border: 1px solid var(--input-border-color);
  object-fit: cover;
`;

// 하단 날짜 및 작성완료 버튼
const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 게시물 시간, 게시물 삭제
const SpanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  transform: translateY(0.6rem);
`;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;

const RemoveSpan = styled.span`
  font-size: var(--fs-sm);
  color: var(--sub-text-color);
  padding: 0.4rem;
  margin-top: -0.8rem;
  cursor: pointer;
  &:hover {
    border-radius: 4px;
    background: var(--sub-text-color);
    color: #ffffff;
  }
`;
