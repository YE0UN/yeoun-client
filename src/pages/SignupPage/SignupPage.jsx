import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InnerLayout from '../../components/common/layout/InnerLayout/InnerLayout';
import YeounLogo from '../../assets/images/logo.svg';
import Button from '../../components/common/Button/Button';
const SignupPage = () => {
  const [validateEmailText, setValidateEmailText] = useState('');
  const [validatePasswordText, setValidatePasswordText] = useState('');
  const [validateDisplayNameText, setValidateDisplayNameText] = useState('');
  const [validatePasswordConfirmText, setValidatePasswordConfirmText] = useState('');
  const [validateDisplayNameNoticeClassname, setValidateDisplayNameNoticeClassname] = useState('validate');
  const [validateEmailNoticeClassname, setValidateEmailNoticeClassname] = useState('validate');
  const [validatePasswordNoticeClassname, setValidatePasswordNoticeClassname] = useState('validate');
  const [validatePasswordConfirmTextClassName, setValidatePasswordConfirmTextClassName] = useState('');

  const displaynameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirm = useRef();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  const navigate = useNavigate();
  const onChangeInputDisplayName = (e) => {
    const enteredDisplayName = e.target.value;
    if (enteredDisplayName.trim() === '') {
      setValidateDisplayNameText('');
      setValidateDisplayNameNoticeClassname('');
      return;
    }
    if (enteredDisplayName.length < 2 || enteredDisplayName.length >= 14) {
      setValidateDisplayNameText('닉네임을 2글자 이상 15글자 미만으로 입력해 주세요');
      setValidateDisplayNameNoticeClassname('validate');
    } else {
      setValidateDisplayNameText('올바른 닉네임 형식입니다.');
      setValidateDisplayNameNoticeClassname('Yeoun-green');
    }
  };

  const onChangeInputEmail = (e) => {
    const enteredEmail = e.target.value;

    if (enteredEmail.trim() === '') {
      setValidateEmailText('');
      setValidateEmailNoticeClassname('');
      return;
    }

    if (validateEmail(enteredEmail) === null) {
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
      setValidatePasswordText('');
      setValidatePasswordNoticeClassname('');
    } else if (!validatePassword(enteredPassword)) {
      setValidatePasswordText('숫자와 문자로 구성된 비밀번호 6글자 이상 입력해주세요');
      setValidatePasswordNoticeClassname('validate');
    } else {
      setValidatePasswordText('');
      setValidatePasswordNoticeClassname('');
    }
  };
  const onChangeInputPasswordConfirm = (e) => {
    const enteredPasswordConfirm = e.target.value;
    const enteredPassword = passwordInputRef.current.value; // 비밀번호 입력란의 값을 가져옴

    if (enteredPasswordConfirm.trim() === '') {
      setValidatePasswordConfirmText('');
      setValidatePasswordConfirmTextClassName('');
    } else if (enteredPasswordConfirm !== enteredPassword) {
      setValidatePasswordConfirmText('비밀번호와 일치하지 않습니다.');
      setValidatePasswordConfirmTextClassName('validate');
    } else {
      setValidatePasswordConfirmText('');
      setValidatePasswordConfirmTextClassName('');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('isLogin')) {
      navigate(`/`);
    }
  }, []);
  const onClickHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredDisplayName = displaynameInputRef.current.value;
    const enteredPasswordConfirm = passwordConfirm.current.value;

    if (validateEmail(enteredEmail) === null) {
      setValidateEmailText('이메일 형식을 입력해 주세요');
      return;
    }

    if (enteredPassword.length < 6) {
      setValidatePasswordText('비밀번호 6글자 이상 입력해주세요');
      return;
    }
    if (enteredPasswordConfirm !== enteredPassword) {
      setValidatePasswordConfirmText('비밀번호와 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/user/signin`, {
        email: enteredEmail,
        password: enteredPassword,
        displayName: enteredDisplayName,
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
          <Field>
            <label htmlFor='displayName'>아이디</label>
            <div className='button-container'>
              <input
                type='text'
                placeholder='아이디'
                id='email'
                name='username'
                required
                ref={emailInputRef}
                onChange={onChangeInputEmail}
              />
              <Button size='lg' onClick={onClickHandler}>
                중복확인
              </Button>
            </div>
            <P className={validateEmailNoticeClassname}>{validateEmailText}</P>
          </Field>
          <Field>
            <label htmlFor='nickName'>닉네임</label>
            <div className='button-container'>
              <input
                type='text'
                placeholder='닉네임'
                id='nickname'
                name='nickname'
                required
                ref={displaynameInputRef}
                onChange={onChangeInputDisplayName}
              />
              <Button size='lg' onClick={onClickHandler}>
                중복확인
              </Button>
            </div>
            <P className={validateDisplayNameNoticeClassname}>{validateDisplayNameText}</P>
          </Field>
          <Field>
            <label>비밀번호</label>
            <input
              type='password'
              placeholder='비밀번호'
              id='password'
              name='password'
              required
              ref={passwordInputRef}
              onChange={onChangeInputPassword}
            />
            <P className={validatePasswordNoticeClassname}>{validatePasswordText}</P>
          </Field>
          <Field>
            <label>비밀번호 확인</label>
            <input
              type='password'
              placeholder='비밀번호 확인'
              id='password-confirm'
              name='password-confirm'
              required
              ref={passwordConfirm}
              onChange={onChangeInputPasswordConfirm}
            />
            <P className={validatePasswordConfirmTextClassName}>{validatePasswordConfirmText}</P>
          </Field>
          <Button variants='main' size='xl' onClick={onClickHandler}>
            가입하기
          </Button>
        </Form>
      </Layout>
    </InnerLayout>
  );
};

export default SignupPage;

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
    border-color: var(--alert-color);
  }
  .Yeoun-green {
    color: var(--main-btn-color);
  }
  width: 60rem;
  padding: 4rem 5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--input-border-color);
  border-radius: 10px;
  align-items: center;
  font-size: var(--fs-sm);
`;

const LogoImg = styled.img`
  width: 12rem;
  height: 6rem;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;

  &:nth-child(4) {
    margin-bottom: 5.2rem;
  }
  input {
    border: solid 1px var(--input-border-color);
    padding: 20px;
    border-radius: 4px;
    display: flex;
    gap: 8px;
    width: 38.4rem;
    height: 5.4rem;

    &:nth-child(2) {
      width: 50rem;
    }
  }
  input:focus {
    outline: none !important;
    border: 1px solid var(--main-btn-color);
  }
  .validate {
    color: var(--alert-color);
  }
  label {
    margin-bottom: 1rem;
    font-size: var(--fs-sm);
    color: var(--sub-text-color);
    font-weight: 700;
  }
  .button-container {
    display: flex;
    gap: 18px;
    align-items: center;
    max-width: 50rem;
  }
`;

const P = styled.p`
  margin-top: 0.8rem;
`;
