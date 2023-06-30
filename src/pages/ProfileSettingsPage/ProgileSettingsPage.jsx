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
  const [initialEmail, setInitialEmail] = useState('');
  const [initialNickname, setInitialNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [emailCheck, setEmailCheck] = useState();
  const [nicknameCheck, setNicknameCheck] = useState();

  const editEmail = (value) => {
    setEmail(value);
  };
  const editNickname = (value) => {
    setNickname(value);
  };
  const emailChecker = (value) => {
    setEmailCheck(value);
  };
  const nicknameChecker = (value) => {
    setNicknameCheck(value);
  };

  // 프로필 이미지 리사이징을 포함한 미리보기 기능
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
      setImagePreview(userIcon);
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
        res.data.user.profileImage ? setImagePreview(res.data.user.profileImage) : setImagePreview(userIcon);
        setInitialEmail(res.data.user.email);
        setEmail(res.data.user.email);
        setInitialNickname(res.data.user.nickname);
        setNickname(res.data.user.nickname);
        setIntroduction(res.data.user.introduction);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // 수정하기 기능
  const onClickHandler = () => {
    console.log(email, nickname, introduction);
    const option = {
      url: `http://localhost:3000/users/${userId}/profile`,
      method: 'PUT',
      data: {
        profileImage: imagePreview,
        email: email,
        nickname: nickname,
        // 비밀번호 수정은 보류
        // password: password,
        introduction: introduction,
      },
    };

    axios(option)
      .then((res) => {
        alert('수정되었습니다.');
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

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  // 버튼 상태 관리
  const [disabledButton, setDisabledButton] = useState();
  useEffect(() => {
    if (
      (emailCheck === 'true' || emailCheck === 'initial') &&
      (nicknameCheck === 'true' || nicknameCheck === 'initial')
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [emailCheck, nicknameCheck]);

  return (
    <InnerLayout>
      <HeadingLayout heading='회원 정보 수정' />
      <SettingContainer>
        <ImageLabel htmlFor='contentImage' imagePreview={imagePreview}>
          {imagePreview === null ? '' : <ImagePreview src={imagePreview} alt='미리보기 이미지' />}
        </ImageLabel>
        <ImageInput id='contentImage' type='file' accept='image/*' onChange={handleImageChange} />
        <InputContainer>
          <EmailInput editEmail={editEmail} initialEmail={initialEmail} emailChecker={emailChecker} />
          <NicknameInput
            editNickname={editNickname}
            initialNickname={initialNickname}
            nicknameChecker={nicknameChecker}
          />
          <Introduction placeholder='소개' maxLength='600' value={introduction} onChange={handleIntroductionChange} />
        </InputContainer>
        <Test>
          <Anchor href='/mypage'>취소</Anchor>
          <Button size='profileSetting' disabled={disabledButton} onClickHandler={onClickHandler}>
            수정하기
          </Button>
        </Test>
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
  height: 85rem;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  margin-bottom: 4.5rem;
`;

// 소개
const Introduction = styled.textarea`
  width: 100%;
  min-height: 20rem;
  max-height: 20rem;
  border: 2px solid ${(props) => (props.isValid ? 'var(--input-border-focus-color)' : 'var(--input-border-color)')};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: var(--fs-md);
  background: #ffffff;

  &:focus {
    outline: none;
    border: 1px solid var(--input-border-focus-color);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Test = styled.div`
  display: flex;
  gap: 4rem;
  max-width: 50rem;
`;

const Anchor = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs-lg);
  color: var(--sub-text-color);
  font-weight: 500;
`;
