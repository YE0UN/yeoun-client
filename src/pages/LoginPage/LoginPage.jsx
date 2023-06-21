import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import YeounLogo from '../../assets/images/logo.svg';
import Button from '../../components/common/Button/Button';

const LoginPage = () => {
  const [validateEmailText, setValidateEmailText] = useState('');
  const [validatePasswordText, setvalidatePasswordText] = useState('');
  const [validateEmailNoticeClassname, setValidateEmailNoticeClassname] = useState('validate');
  const [validatePasswordNoticeClassname, setValidatePasswordNoticeClassname] = useState('validate');
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const onChangeInputEmail = (e) => {
    const enteredEmail = e.target.value;

    if (enteredEmail.trim() === '') {
      setValidateEmailText(''); // 빈 문자열로 설정하여 메시지를 숨깁니다.
      setValidateEmailNoticeClassname('validate hidden'); // 추가된 CSS 클래스로 메시지를 숨깁니다.
    } else if (validateEmail(enteredEmail) === null) {
      setValidateEmailText('이메일 형식으로 입력해 주세요');
      setValidateEmailNoticeClassname('validate');
    } else {
      setValidateEmailText('올바른 이메일 형식입니다.');
      setValidateEmailNoticeClassname('Yeoun-green');
    }
  };

  const onChangeInputPassword = (e) => {
    const enteredPassword = e.target.value;

    if (enteredPassword.trim() === '') {
      setvalidatePasswordText(''); // 빈 문자열로 설정하여 메시지를 숨깁니다.
      setValidatePasswordNoticeClassname('validate hidden'); // 추가된 CSS 클래스로 메시지를 숨깁니다.
    } else if (enteredPassword.length < 6) {
      setvalidatePasswordText('숫자,문자로 구성된 비밀번호 6글자 이상 입력해주세요');
      setValidatePasswordNoticeClassname('validate');
    } else {
      setvalidatePasswordText('비밀번호가 일치합니다');
      setValidatePasswordNoticeClassname('Yeoun-green');
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate('/users/signup');
  };
  useEffect(() => {
    if (sessionStorage.getItem('isLogin')) {
      navigate(`/`);
    }
  }, []);
  const usesubmitHandler = async (e) => {
    e.preventDefault();
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (validateEmail(enteredEmail) === null) {
      setValidateEmailText('이메일 형식을 입력해 주세요');
      return;
    }

    if (enteredPassword.length < 6) {
      setvalidatePasswordText('비밀번호 6글자 이상 입력해주세요');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/signin`, {
        email: enteredEmail,
        password: enteredPassword,
      });

      if (response.status === 200) {
        sessionStorage.setItem('isLogin', true);
        navigate('/');
      } else {
        // Handle unsuccessful login here
      }
    } catch (error) {
      // Handle error here
    }
  };
  return (
    <InnerLayout>
      <Layout>
        <LogoImg src={YeounLogo} alt='여운로고'></LogoImg>
        <Form onSubmit={(e) => e.preventDefault()}>
          <InputWrapper>
            <Field>
              <input
                type='text'
                placeholder='아이디'
                id='email'
                name='username'
                required
                ref={emailInputRef}
                autoComplete='off'
                onChange={onChangeInputEmail}
              />
              <p className={validateEmailNoticeClassname}>{validateEmailText}</p>
            </Field>
            <Field>
              <input
                type='password'
                placeholder='비밀번호'
                id='password'
                name='password'
                required
                ref={passwordInputRef}
                autoComplete='off'
                onChange={onChangeInputPassword}
              />
              <p className={validatePasswordNoticeClassname}>{validatePasswordText}</p>
            </Field>
            <Button variants='main' size='xl' onClick={usesubmitHandler}>
              로그인
            </Button>
          </InputWrapper>
        </Form>
        <SignUpLink type='button' onClick={signupHandler}>
          회원가입
        </SignUpLink>
      </Layout>
    </InnerLayout>
  );
};

export default LoginPage;

const Layout = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  .validate {
    color: var(--alert-color);
    padding: 0.5rem;
    border-color: var(--alert-color);
  }
  .Yeoun-green {
    color: green;
    padding: 0.5rem;
  }
  margin: 0 auto;
  width: 60rem;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  align-items: center;
  font-size: var(--fs-sm);
  box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.18);
  -webkit-box-shadow: 2x 5px 5px 0px rgba(0, 0, 0, 0.18);
  -moz-box-shadow: 2px 5px 5px 0px rgba(0, 0, 0, 0.18);
`;

const LogoImg = styled.img`
  width: 12rem;
  height: 6rem;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 45rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 40rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  input {
    border: solid 1px #ccc;
    padding: 2rem;
    border-radius: 4px;
  }
  input:focus {
    outline: none !important;
    border: solid 2px var(--main-btn-color);
  }
  input:invalid {
    background-color: var(--btn-text-color);
  }

  .validate {
    color: var(--alert-color) !important;
    padding: 0.5rem;
  }
  p {
    margin-top: 8px;
  }
`;
const SignUpLink = styled.div`
  font-size: var(--fs-sm);
  margin: 30px 15px;
  font-weight: 700;
  color: var(--sub-text-color);
  &:hover {
    color: var(--main-btn-color);
  }
`;
