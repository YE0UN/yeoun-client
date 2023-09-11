import React, { useContext } from 'react';
import styled from 'styled-components';
import settingIcon from '../../../../assets/images/setting-icon.svg';
import API from '../../../../api/API';
import ENDPOINT from '../../../../api/ENDPOINT';
import Modal from '../../modal/Modal/Modal';
import useModal from '../../../../hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../../context/AuthContext';

const HeadingLayout = ({ heading, subHeading }) => {
  const { setUserId } = useContext(AuthContextStore);

  const navigate = useNavigate();

  const handleClick = () => {
    API(`${ENDPOINT.DELETE_ACCOUNT}`, 'DELETE')
      .then((res) => {
        console.log(res);
        localStorage.removeItem('userId');
        setUserId(null);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  // useModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  return (
    <>
      <section>
        <Wrapper>
          <H2>{heading}</H2>
          {subHeading === '회원 정보 설정' ? (
            <Anchor href='/profile/edit'>
              <SettingIcon src={settingIcon} alt='회원 정보 설정 아이콘' />
              {subHeading}
            </Anchor>
          ) : (
            <Button type='button' onClick={toggle} ref={firstRef}>
              {subHeading}
            </Button>
          )}
        </Wrapper>
      </section>
      {modalOpen && (
        <Modal toggle={toggle} secondRef={secondRef} confirm={handleClick} modalHeading='정말로 탈퇴하시겠습니까?' />
      )}
    </>
  );
};

export default HeadingLayout;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  border-bottom: 1px solid var(--border-color);
`;

const H2 = styled.h2`
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-top: 9rem;
  padding-bottom: 1.6rem;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin-top: 9rem;
  font-size: var(--fs-md);
  font-weight: 500;
  color: var(--sub-text-color);
`;

const Button = styled(Anchor)`
  cursor: pointer;
`;

const SettingIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0 0.6rem 0 0;
`;
