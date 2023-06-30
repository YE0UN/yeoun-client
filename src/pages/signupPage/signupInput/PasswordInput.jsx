import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PasswordInput = ({ getPassword, handleKeyDown }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');
  const [confirmPasswordValidationMessage, setConfirmPasswordValidationMessage] = useState('');

  // 비밀번호 validation
  useEffect(() => {
    if (password.length < 6 && password !== '') {
      setPasswordValidationMessage('6 ~ 14자리 비밀번호를 설정해 주세요.');
      setPasswordError(true);
    } else if (password === '') {
      setPasswordValidationMessage('');
      setPasswordError('');
    } else {
      setPasswordValidationMessage('');
      setPasswordError(false);
    }
  }, [password]);

  useEffect(() => {
    if (confirmPassword.length >= 6 && password === confirmPassword) {
      setConfirmPasswordValidationMessage('');
      setConfirmPasswordError(false);
      getPassword(password);
    } else if (confirmPassword.length !== 0) {
      setConfirmPasswordValidationMessage('비밀번호가 일치하지 않습니다.');
      setConfirmPasswordError(true);
      getPassword('');
    }

    if (confirmPassword.length === 0) {
      setConfirmPasswordValidationMessage('');
    }
  }, [password, confirmPassword, getPassword]);

  const onChangePasswordHandler = (e) => {
    if (e.target.value !== ' ') setPassword(e.target.value);
  };

  const onChangeConfirmPasswordHandler = (e) => {
    if (e.target.value !== ' ') setConfirmPassword(e.target.value);
  };

  return (
    <>
      <InputWrapper>
        <InputLabel>비밀번호</InputLabel>
        <Input
          type='password'
          placeholder='6 ~ 14자리 비밀번호를 설정해 주세요.'
          maxLength={14}
          value={password}
          onChange={onChangePasswordHandler}
        />
        {ValidationMessage ? (
          <ValidationMessage error={passwordError}>{passwordValidationMessage}</ValidationMessage>
        ) : (
          <></>
        )}
      </InputWrapper>
      <InputWrapper>
        <InputLabel>비밀번호 확인</InputLabel>
        <Input
          type='password'
          placeholder='비밀번호를 확인해 주세요.'
          maxLength={14}
          value={confirmPassword}
          onChange={onChangeConfirmPasswordHandler}
          onKeyDown={handleKeyDown}
        />
        {ValidationMessage ? (
          <ValidationMessage error={confirmPasswordError}>{confirmPasswordValidationMessage}</ValidationMessage>
        ) : (
          <></>
        )}
      </InputWrapper>
    </>
  );
};

export default PasswordInput;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  color: ${({ error }) => error && 'var(--main-alert-color)'};
`;
