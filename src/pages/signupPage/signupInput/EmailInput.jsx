import React, { useEffect, useState } from 'react';
import Button from '../../../components/common/Button/Button';
import styled from 'styled-components';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

const EmailInput = ({ getEmail, handleKeyDown, initialEmail, editEmail, emailChecker }) => {
  const [email, setEmail] = useState('');
  const [isValidatedEmail, setIsValidatedEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState('');

  // 프로필 설정 초기값 (ProgileSettingsPage)
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  // 이메일 중복 검사 및 수정하기 버튼을 위한 기능 (ProgileSettingsPage)
  useEffect(() => {
    if (isValidatedEmail && (confirmEmail === true || !confirmEmail === '')) {
      emailChecker && emailChecker('true');
    } else if (initialEmail === email) {
      emailChecker && emailChecker('initial');
    } else {
      emailChecker && emailChecker('false');
    }
  });

  // 이메일 validation
  useEffect(() => {
    const regexEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!regexEmail.test(email) && email !== '') {
      setIsValidatedEmail(false);
    } else if (email === '') {
      setIsValidatedEmail('');
    } else {
      setIsValidatedEmail(true);
    }
  }, [email]);

  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
    getEmail && getEmail('');
    setConfirmEmail('');
    editEmail && editEmail(e.target.value);
  };

  const onClickCheckHandler = () => {
    API(`${ENDPOINT.EMAIL_DUPLICATE_CHECK}/${email}`, 'GET')
      .then(() => {
        setConfirmEmail(true);
        getEmail && getEmail(email);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setConfirmEmail(false);
          getEmail && getEmail('');
          return;
        }
        console.error(err);
      });
  };

  let validationMessage = '';

  if (!isValidatedEmail && email !== '') {
    validationMessage = '올바른 이메일 형식이 아닙니다.';
  } else if (confirmEmail === false && isValidatedEmail === true) {
    validationMessage = '이미 사용중인 아이디입니다.';
  } else if (confirmEmail === true && isValidatedEmail === true) {
    validationMessage = '사용 가능한 아이디입니다.';
  }

  // 버튼 상태관리
  const [disabledButton, setDisabledButton] = useState();
  useEffect(() => {
    if (initialEmail === email || !isValidatedEmail) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [initialEmail, email, isValidatedEmail]);

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
            onKeyDown={handleKeyDown}
          />
          <Button size='lg' disabled={disabledButton} onClickHandler={onClickCheckHandler}>
            중복 확인
          </Button>
        </EmailWrapper>
        <ValidationMessage error={!isValidatedEmail || confirmEmail === '' || confirmEmail === false}>
          {validationMessage}
        </ValidationMessage>
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
