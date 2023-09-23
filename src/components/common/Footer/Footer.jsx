import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/images/logo.svg';
import InnerLayout from './../layout/InnerLayout/InnerLayout';
import LocalSVGSprite from '../../SVGSprite/LocalSVGSprite';

const Footer = () => {
  return (
    <FooterTag>
      <InnerLayout>
        <a href='/'>
          <LogoImg src={logo} alt='여운 로고' />
        </a>
        <Line></Line>
        <Address>
          <CopyrightP>
            <LocalSVGSprite
              id='copyright-icon'
              width='1.6rem'
              height='1.6rem'
              ariaLabel='저작권 아이콘'
              cursor='initial'
            />
            <Strong>2023 yeoun All rights reserved.</Strong>
          </CopyrightP>
          <a href='https://github.com/YE0UN'>
            <LocalSVGSprite
              id='octocat-icon'
              color='transparent'
              width='3.2rem'
              height='3.2rem'
              ariaLabel='옥토캣 아이콘'
            />
          </a>
        </Address>
      </InnerLayout>
    </FooterTag>
  );
};

export default Footer;

const FooterTag = styled.footer`
  min-width: 120rem;
  background: var(--main-bg-color);
  height: 30rem;
  padding: 5rem 0 0 0;
`;

const LogoImg = styled.img`
  width: 16rem;
  height: 4.5rem;
  cursor: pointer;
`;

const Line = styled.div`
  width: 100%;
  height: 0.1rem;
  background: var(--border-color);
  margin-top: 14rem;
`;

const Address = styled.address`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-top: 1.5rem;
`;

const CopyrightP = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Strong = styled.strong`
  font-size: var(--fs-xs);
  font-weight: 700;
`;
