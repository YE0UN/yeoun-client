import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import Button from './../../components/common/Button/Button';
import { AuthContextStore } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import HeadingLayout from './../../components/common/layout/HeadingLayout/HeadingLayout';
import Cookies from 'js-cookie';
import API from '../../api/API';
import ENDPOINT from '../../api/ENDPOINT';

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
    API(`${ENDPOINT.LOGIN}`, 'POST', {
      email: email,
      password: password,
    })
      .then((res) => {
        setLoginFail(false);
        saveUserInfo(res);
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.user === false) {
          setLoginFail(true);
        }
      });
  };

  const saveUserInfo = (res) => {
    const userId = res.data.user._id;
    const token = res.data.token;

    localStorage.setItem('userId', userId);
    setUserId(userId);

    Cookies.set('token', token, { expires: 365 });
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
                autoFocus
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
          <LinkCustom to='/join'>회원가입</LinkCustom>
        </LoginContainer>
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
  height: 100%;
  padding: 5rem;
  margin: 12rem auto;
  border: 1px solid var(--input-border-color);
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  margin: 1rem 0;
  color: var(--main-alert-color);
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

const LinkCustom = styled(Link)`
  width: 100%;
  min-height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto 0;
  font-size: var(--fs-lg);
  font-weight: 500;
  border: 1px solid var(--main-btn-color);
  border-radius: 0.8rem;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
