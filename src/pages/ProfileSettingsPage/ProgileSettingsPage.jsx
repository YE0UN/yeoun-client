import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../components/common/layout/HeadingLayout/HeadingLayout';
import axios from 'axios';
import EmailInput from '../signupPage/signupInput/EmailInput';
import NicknameInput from '../signupPage/signupInput/NicknameInput';
import Button from '../../components/common/Button/Button';
import styled from 'styled-components';
import { AuthContextStore } from '../../context/AuthContext';
import imageCompression from 'browser-image-compression';
import userIcon from '../../assets/images/user-icon.svg';
import { useNavigate } from 'react-router';

const ProfileSettingsPage = () => {
  const { userId } = useContext(AuthContextStore);

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(userIcon);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  const getEmail = (value) => {
    setEmail(value);
  };

  const getNickname = (value) => {
    setNickname(value);
  };

  // 이미지 리사이징을 포함한 미리보기 기능
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

  // 유저 정보 가져오기
  const getUserData = useCallback(() => {
    const option = {
      url: `http://localhost:3000/users/${userId}/profile`,
      method: 'GET',
    };

    axios(option)
      .then((res) => {
        console.log(res);
        res.data.user.profileImage && setImagePreview(res.data.user.profileImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const onClickHandler = () => {
    console.log('클릭!');
    const option = {
      url: `http://localhost:3000/users/${userId}/profile/image`,
      method: 'PUT',
      data: {
        profileImage: imagePreview,
      },
    };

    axios(option)
      .then((res) => {
        const newPath = `/mypage`;
        navigate(newPath);
        // 페이지 전환 시, 새로고침
        window.location.href = newPath;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <InnerLayout>
      <HeadingLayout heading='회원 정보 수정' />
      <SettingContainer>
        <ImageLabel htmlFor='contentImage' imagePreview={imagePreview}>
          {imagePreview === null ? '' : <ImagePreview src={imagePreview} alt='미리보기 이미지' />}
        </ImageLabel>
        <ImageInput id='contentImage' type='file' accept='image/*' onChange={handleImageChange} />
        {/* <InputContainer>
            <EmailInput getEmail={getEmail} />
            <NicknameInput getNickname={getNickname} />
          </InputContainer> */}
        <Button size='xl' onClickHandler={onClickHandler}>
          수정하기
        </Button>
      </SettingContainer>
    </InnerLayout>
  );
};

export default ProfileSettingsPage;

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  height: 67.2rem;
  padding: 5rem 5rem 4rem;
  margin: 12rem auto;
  border: 1px solid var(--input-border-color);
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  display: block;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 5rem;
  background: var(--profile-bg-color);
  border: 1px solid var(--profile-border-color);
`;

const ImagePreview = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  border: 1px solid var(--input-border-color);
  object-fit: cover;
`;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 3.5rem;
//   margin-bottom: 4rem;
// `;
