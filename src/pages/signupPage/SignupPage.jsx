import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from './../../components/common/layout/HeadingLayout/HeadingLayout';
import Button from '../../components/common/Button/Button';
import EmailInput from './signupInput/EmailInput';
import NicknameInput from './signupInput/NicknameInput';
import PasswordInput from './signupInput/PasswordInput';
import API from '../../api/API';
import ENDPOINT from '../../api/ENDPOINT';

const SignupPage = () => {
  const nvigate = useNavigate();

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();

  // console.log(`email:${email}\nnickname:${nickname}\npassword:${password}`);

  // 각각의 인풋 컴포넌트에서 데이터 가져오기
  const getEmail = (value) => {
    setEmail(value);
  };
  const getNickname = (value) => {
    setNickname(value);
  };
  const getPassword = (value) => {
    setPassword(value);
  };

  // 회원가입 기능
  const onClickJoinHandler = () => {
    API(`${ENDPOINT.SIGNUP}`, 'POST', {
      email: email,
      nickname: nickname,
      password: password,
    })
      .then((res) => {
        // 회원가입 성공 시
        nvigate('/login');
      })
      .catch((err) => {
        // 에러 발생 시
        console.log(err);
      });
  };

  // 버튼 상태 관리
  const [disabledButton, setDisabledButton] = useState(true);
  useEffect(() => {
    if (email && nickname && password) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [email, nickname, password]);

  //  이메일, 닉네임 중복확인 모두 되었는지 검사
  const alertHandler = () => {
    alert('중복확인을 모두 진행해 주세요.');
  };

  // enter로 가입 완료
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (email && nickname && password) {
        onClickJoinHandler();
      } else {
        alertHandler();
      }
    }
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='회원가입' />
        <SignupContainer>
          <InputContainer>
            <EmailInput getEmail={getEmail} handleKeyDown={handleKeyDown} />
            <NicknameInput getNickname={getNickname} handleKeyDown={handleKeyDown} />
            <PasswordInput getPassword={getPassword} handleKeyDown={handleKeyDown} />
          </InputContainer>
          <Button
            size='xl'
            disabled={disabledButton}
            onClickHandler={!(email && nickname) ? alertHandler : onClickJoinHandler}
          >
            가입하기
          </Button>
        </SignupContainer>
      </InnerLayout>
    </>
  );
};

export default SignupPage;

const SignupContainer = styled.div`
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  margin-bottom: 4rem;
`;
