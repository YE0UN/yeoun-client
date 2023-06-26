import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/Button/Button';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const NicknameInput = ({ getNickname }) => {
  const [nickname, setNickname] = useState('');
  const [isValidatedNickname, setIsValidatedNickname] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  // 닉네임 validation
  useEffect(() => {
    const regexNickname = /^[a-z0-9A-Z_.]{0,}$/;

    if (!regexNickname.test(nickname) && nickname !== '') {
      setIsValidatedNickname(false);
      setValidationMessage('올바른 닉네임 형식이 아닙니다.');
    } else if (nickname === '') {
      setIsValidatedNickname(false);
      setValidationMessage('');
    } else {
      setIsValidatedNickname(true);
      setValidationMessage('');
    }
  }, [nickname]);

  const onChangeNicknameHandler = (e) => {
    setNickname(e.target.value);
    setValidationMessage('');
    getNickname('');
  };

  const onClickCheckHandler = () => {
    const option = {
      url: `http://localhost:3000/users/validate/nickname/${nickname}`,
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      data: {
        nickname: nickname,
      },
    };

    axios(option)
      .then((res) => {
        setValidationMessage('사용 가능한 닉네임입니다.');
        getNickname(nickname);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 409) {
          setIsValidatedNickname(false);
          setValidationMessage('이미 사용중인 닉네임입니다.');
          getNickname('');
          return;
        }
        console.error(err);
      });
  };

  return (
    <>
      <InputWrapper>
        <InputLabel htmlFor='nickname'>닉네임</InputLabel>
        <EmailWrapper>
          <Input
            type='text'
            id='nickname'
            placeholder='영문, 숫자, 특수문자(.), (_)만 사용 가능합니다.'
            autoComplete='off'
            spellCheck='false'
            maxLength={10}
            value={nickname}
            onChange={onChangeNicknameHandler}
          />
          <Button
            size='lg'
            disabled={!(nickname.length >= 2) || !isValidatedNickname}
            onClickHandler={onClickCheckHandler}
          >
            중복 확인
          </Button>
        </EmailWrapper>
        {ValidationMessage ? (
          <ValidationMessage error={!isValidatedNickname}>{validationMessage}</ValidationMessage>
        ) : (
          <></>
        )}
      </InputWrapper>
    </>
  );
};

export default NicknameInput;

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
