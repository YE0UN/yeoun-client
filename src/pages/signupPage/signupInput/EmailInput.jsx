import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/Button/Button';
import styled from 'styled-components';
import axios from 'axios';

const EmailInput = ({ getEmail }) => {
  const [email, setEmail] = useState('');
  const [isValidatedEmail, setIsValidatedEmail] = useState();
  const [validationMessage, setValidationMessage] = useState('');

  // 이메일 validation
  useEffect(() => {
    const regexEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regexEmail.test(email) && email !== '') {
      setIsValidatedEmail(false);
      setValidationMessage('올바른 이메일 형식이 아닙니다.');
    } else if (email === '') {
      setIsValidatedEmail('');
      setValidationMessage('');
    } else {
      setIsValidatedEmail(true);
      setValidationMessage('');
    }
  }, [email]);

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
    setValidationMessage('');
    getEmail('');
  };

  const onClickCheckHandler = () => {
    const option = {
      url: `http://localhost:3000/users/validate/email/${email}`,
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      data: {
        email: email,
      },
    };

    axios(option)
      .then((res) => {
        setIsValidatedEmail(true);
        setValidationMessage('사용 가능한 아이디입니다.');
        getEmail(email);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setIsValidatedEmail(false);
          setValidationMessage('이미 사용중인 아이디입니다.');
          getEmail('');
          return;
        }
        console.error(err);
      });
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlFor='email'>아이디</InputLabel>
        <EmailWrapper>
          <Input
            type='text'
            id='email'
            placeholder='이메일 주소를 입력해 주세요.'
            autoComplete='off'
            spellCheck='false'
            maxLength={30}
            value={email}
            onChange={onChangeEmailHandler}
          />
          <Button size='lg' disabled={!isValidatedEmail} onClickHandler={onClickCheckHandler}>
            중복 확인
          </Button>
        </EmailWrapper>
        {ValidationMessage ? (
          <ValidationMessage error={!isValidatedEmail}>{validationMessage}</ValidationMessage>
        ) : (
          <></>
        )}
      </InputWrapper>
    </>
  );
};

export default EmailInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailWrapper = styled.div`
  display: flex;
  gap: 1.8rem;
  width: 50rem;
`;

const InputLabel = styled.label`
  font-size: var(--fs-sm);
  font-weight: 700;
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  &:focus {
    border: 1px solid var(--input-border-focus-color);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
  &::placeholder {
    font-size: var(--fs-sm);
    font-weight: initial;
  }
`;

const ValidationMessage = styled.p`
  font-size: var(--fs-sm);
  height: 0rem;
  color: ${({ error }) => (error ? 'var(--main-alert-color)' : 'var(--sub-alert-color)')};
`;
