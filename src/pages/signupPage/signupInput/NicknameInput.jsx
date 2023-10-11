import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/Button/Button';
import styled from 'styled-components';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

const NicknameInput = ({ getNickname, handleKeyDown, initialNickname, editNickname, nicknameChecker }) => {
  const [nickname, setNickname] = useState('');
  const [isValidatedNickname, setIsValidatedNickname] = useState('');
  const [confirmNickname, setConfirmNickname] = useState('');

  // 프로필 설정 초기값 (ProgileSettingsPage)
  useEffect(() => {
    if (initialNickname) {
      setNickname(initialNickname);
    }
  }, [initialNickname]);

  // 닉네임 중복 검사 및 수정하기 버튼을 위한 기능 (ProgileSettingsPage)
  useEffect(() => {
    if (isValidatedNickname && (confirmNickname === true || !confirmNickname === '')) {
      nicknameChecker && nicknameChecker('true');
    } else if (initialNickname === nickname) {
      nicknameChecker && nicknameChecker('initial');
    } else {
      nicknameChecker && nicknameChecker('false');
    }
  });

  // 닉네임 validation
  useEffect(() => {
    const regexNickname = /^[a-z0-9A-Z_.가-힣]{2,}$/;

    if (!regexNickname.test(nickname) && nickname !== '') {
      setIsValidatedNickname(false);
    } else if (nickname === '') {
      setIsValidatedNickname(false);
    } else {
      setIsValidatedNickname(true);
    }
  }, [nickname]);

  const onChangeNicknameHandler = (e) => {
    setNickname(e.target.value);
    getNickname && getNickname('');
    setConfirmNickname('');
    editNickname && editNickname(e.target.value);
  };

  const onClickCheckHandler = () => {
    API(`${ENDPOINT.NICKNAME_DUPLICATE_CHECK}/${nickname}`, 'GET')
      .then((res) => {
        setConfirmNickname(true);
        getNickname && getNickname(nickname);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setConfirmNickname(false);
          getNickname && getNickname('');
          return;
        }
      });
  };

  let validationMessage = '';

  if (!isValidatedNickname && nickname !== '') {
    validationMessage = '올바른 닉네임 형식이 아닙니다.';
  } else if (confirmNickname === false && isValidatedNickname === true) {
    validationMessage = '이미 사용중인 닉네임입니다.';
  } else if (confirmNickname === true && isValidatedNickname === true) {
    validationMessage = '사용 가능한 닉네임입니다.';
  }

  // 버튼 상태관리
  const [disabledButton, setDisabledButton] = useState();
  useEffect(() => {
    if (!(nickname.length >= 2) || !isValidatedNickname || initialNickname === nickname) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [initialNickname, nickname, isValidatedNickname]);

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
            onKeyDown={handleKeyDown}
          />
          <Button size='lg' disabled={disabledButton} onClickHandler={onClickCheckHandler}>
            중복 확인
          </Button>
        </EmailWrapper>
        {ValidationMessage ? (
          <ValidationMessage error={!isValidatedNickname || confirmNickname === '' || confirmNickname === false}>
            {validationMessage}
          </ValidationMessage>
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
