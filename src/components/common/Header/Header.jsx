import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../../../assets/images/logo.svg';
import Button from '../Button/Button';
import InnerLayout from '../layout/InnerLayout/InnerLayout';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import userIcon from '../../../assets/images/user-icon.svg';
import { useCallback } from 'react';
import useModal from '../../../hooks/useModal';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

const Header = () => {
  const { userId, setUserId } = useContext(AuthContextStore);

  const navigate = useNavigate();

  // 드롭다운 메뉴 기능 UseModal
  const [modalOpen, toggle, firstRef, secondRef] = useModal();

  // 로그아웃 기능
  const onClickLogoutHandler = () => {
    API(`${ENDPOINT.LOGOUT}`, 'POST')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    localStorage.removeItem('userId');
    setUserId(null);
    // navigate('/');
    // window.location.reload();
  };

  // 유저 프로필
  const [userProfile, setUserProfile] = useState(userIcon);

  // 유저 정보 가져오기
  const getUserData = useCallback(() => {
    userId &&
      API(`${ENDPOINT.GET_USER_INFO}`, 'GET')
        .then((res) => {
          res.data.user.profileImage ? setUserProfile(res.data.user.profileImage) : setUserProfile(userIcon);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [userId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <HeaderContainer>
      <InnerLayout>
        <HeaderWrapper>
          <a href='/'>
            <h1>
              <LogoImg src={Logo} alt='여운 로고' />
            </h1>
          </a>
          <Nav>
            <Ul>
              <Li>
                <Link to='/tour'>관광지</Link>
              </Li>
              <Li>
                <Link
                  to='/post'
                  onClick={() => {
                    userId ? <></> : alert('로그인 후 이용 가능합니다.');
                  }}
                >
                  새 글 작성
                </Link>
              </Li>
              {userId ? (
                <Li>
                  <DropdownButton type='button' onClick={toggle} ref={firstRef}>
                    <Img src={userProfile} alt='' />
                  </DropdownButton>
                  {modalOpen && (
                    <DropdownMenu ref={secondRef}>
                      <MenuItem
                        onClick={() => {
                          toggle();
                          navigate('/mypage');
                        }}
                      >
                        마이페이지
                      </MenuItem>
                      <MenuItem onClick={onClickLogoutHandler}>로그아웃</MenuItem>
                    </DropdownMenu>
                  )}
                </Li>
              ) : (
                <Li>
                  <Link to='/login'>
                    <Button size='md'>로그인</Button>
                  </Link>
                </Li>
              )}
            </Ul>
          </Nav>
        </HeaderWrapper>
      </InnerLayout>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  height: 8rem;
  border-bottom: 1px solid var(--border-color);
`;

const HeaderWrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  width: 20rem;
  height: 6rem;
  cursor: pointer;
`;

const Nav = styled.nav``;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 5rem;
`;

const Li = styled.li`
  font-size: var(--fs-lg);
  color: var(--sub-text-color);
  font-weight: 700;
  cursor: pointer;
  position: relative;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  vertical-align: bottom;
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
  border: 1px solid var(--profile-border-color);
  border-radius: 50%;
  background: var(--profile-bg-color);
`;

const DropdownMenu = styled.ul`
  position: absolute;
  width: 12rem;
  top: 5.5rem;
  left: -3.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: var(--main-btn-color);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const MenuItem = styled.li`
  width: 100%;
  padding: 0.6rem;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--btn-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--sub-btn-color);
    border-radius: 8px;
  }
`;
