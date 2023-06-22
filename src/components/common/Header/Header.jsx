import React from 'react';
import styled from 'styled-components';
import Logo from '../../../assets/images/logo.svg';
import Button from '../Button/Button';
import InnerLayout from '../layout/InnerLayout/InnerLayout';
// import userFillIcon from '../../../assets/images/user-fill.svg';

const Header = () => {
  return (
    <HeaderContainer>
      <InnerLayout>
        <HeaderWrapper>
          <h1>
            <LogoImg src={Logo} alt='여운 로고' />
          </h1>
          <Nav>
            <Ul>
              <Li>관광지</Li>
              <Li>새 글 작성</Li>
              <Li>
                <Button variants='main' size='md'>
                  로그인
                </Button>
              </Li>
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
  width: 12rem;
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
`;
