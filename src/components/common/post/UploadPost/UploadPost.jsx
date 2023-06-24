import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from '../../../../assets/images/user-icon.svg';
import Button from '../../Button/Button';
import photoIcon from '../../../../assets/images/photo-icon.svg';

const UploadPost = ({
  bookMark,
  profileImage,
  userName,
  content,
  postImage,
  likeCount,
  commentCount,
  onClickPostModificationHandler,
}) => {
  // 유저 프로필 이미지 alt
  const ProfileImgAlt = `${userName} 이미지`;

  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

  // 이미지 미리보기 기능
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // 작성완료 버튼 기능
  const handlePostSubmit = () => {
    if (title !== '' && postContent !== '') {
      // 게시물 작성 완료 시 처리할 로직이 들어갈 곳
      console.log('게시물 작성 완료!');
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

  return (
    <>
      <Article>
        <h3 className='sr-only'>{userName}의 Post</h3>
        <ProfileInfoDiv>
          <ProfileImg src={userIcon} alt={ProfileImgAlt} />
          <UserNameP>{userName}</UserNameP>
        </ProfileInfoDiv>
        <TitleInput
          type='text'
          placeholder='제목'
          autoFocus
          value={title}
          onChange={handleTitleChange}
          isValid={isTitleValid}
        />
        <ContentTextArea
          placeholder='내용'
          value={postContent}
          onChange={handleContentChange}
          isValid={isContentValid}
        />
        <ImageLabel htmlFor='contentImage' imagePreview={imagePreview}>
          {imagePreview === null ? '' : <ImagePreview src={imagePreview} alt='미리보기 이미지' />}
        </ImageLabel>
        <ImageInput id='contentImage' type='file' accept='image/*' onChange={handleImageChange} />

        <PostInfo>
          <PostDateSpan>{getCurrentDate()}</PostDateSpan>
          <Button
            size='md'
            onClickHandler={onClickPostModificationHandler ? onClickPostModificationHandler : handlePostSubmit}
            disabled={!isTitleValid || !isContentValid}
          >
            작성완료
          </Button>
        </PostInfo>
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
  height: 84.5rem;
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
  height: 16.2rem;
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
  width: 100%;
  height: 38rem;
  border-radius: 30px;
  cursor: pointer;
  background: 97% 95% ${(props) => (props.imagePreview ? '' : `url(${photoIcon})`)} var(--image-label-bg) no-repeat;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 38rem;
  border-radius: 30px;
  border: 1px solid var(--input-border-color);
`;

// 하단 날짜 및 작성완료 버튼
const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostDateSpan = styled.span`
  color: var(--sub-text-color);
`;
