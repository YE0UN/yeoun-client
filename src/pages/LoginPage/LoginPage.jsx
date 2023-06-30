import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import Button from './../../components/common/Button/Button';
import axios from 'axios';
import { AuthContextStore } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import HeadingLayout from './../../components/common/layout/HeadingLayout/HeadingLayout';

const Login = () => {
  const { setUserId } = useContext(AuthContextStore);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
    setLoginFail(false);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
    setLoginFail(false);
  };

  const handleLogin = () => {
    const option = {
      url: 'http://localhost:3000/users/signin',
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      data: {
        email: email,
        password: password,
      },
    };

    axios(option)
      .then((res) => {
        setLoginFail(false);
        saveUserInfo(res);
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            setLoginFail(true);
          }
        }
      });
  };

  const saveUserInfo = (res) => {
    const userId = res.data.userId;
    localStorage.setItem('userId', userId);
    setUserId(userId);
  };

  // enter로 로그인
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (email && password) {
        handleLogin();
      }
    }
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='로그인' />
        <LoginContainer>
          <InputContainer>
            <EmailWrapper>
              <Input
                type='text'
                placeholder='아이디'
                value={email}
                onChange={onChangeEmailHandler}
                onKeyDown={handleKeyDown}
                isValidEmail={isValidEmail}
              />
            </EmailWrapper>
            <PasswordWrapper>
              <Input
                type='password'
                placeholder='비밀번호'
                value={password}
                onChange={onChangePasswordHandler}
                onKeyDown={handleKeyDown}
                isValidPassword={isValidPassword}
              />
            </PasswordWrapper>
          </InputContainer>
          <ErrorMsg show={loginFail}>아이디 또는 비밀번호가 일치하지 않습니다.</ErrorMsg>
          <Button size='xl' disabled={!email || !password} onClickHandler={handleLogin}>
            로그인
          </Button>
        </LoginContainer>
        <LinkCustom to='/join'>회원가입</LinkCustom>
      </InnerLayout>
    </>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60rem;
  height: 35rem;
  padding: 5rem 5rem 4rem;
  margin: 12rem auto 0;
  border: 1px solid var(--input-border-color);
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 50rem;
  height: 5.4rem;
  padding: 1.5rem;
  font-size: var(--fs-md);
  font-weight: 500;
  border: 1px solid var(--input-border-color);
  border-radius: 8px;
  outline: none;
  &:focus {
    border: 1px solid var(--input-border-focus-color);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ErrorMsg = styled.strong`
  align-self: flex-start;
  font-size: var(--fs-sm);
  margin: 1rem 0 3rem;
  color: var(--main-alert-color);
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const LinkCustom = styled(Link)`
  width: 6rem;
  display: flex;
  justify-content: center;
  margin: 4rem auto 12rem;
  font-size: var(--fs-sm);
  color: var(--sub-text-color);
  &:hover {
    transform: scale(1.05);
  }
`;
