import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/images/logo.svg';
import octocatIcon from '../../../assets/images/octocat-icon.svg';
import copyrightIcon from '../../../assets/images/copyright-icon.svg';

const Footer = () => {
  return (
    <FooterTag>
      <InnerFooter>
        <LogoImg src={logo} alt='여운 로고' />
        <Line></Line>
        <Address>
          <CopyrightP>
            <CopyrightImg src={copyrightIcon} alt='저작권 아이콘' />
            <Strong>2023 여운 All rights reserved.</Strong>
          </CopyrightP>
          <OctocatImg src={octocatIcon} alt='옥토캣' />
        </Address>
      </InnerFooter>
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

const InnerFooter = styled.div`
  width: 120rem;
  margin: 0 auto;
`;

const LogoImg = styled.img`
  width: 8rem;
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

const CopyrightImg = styled.img`
  width: 1.6rem;
  height: 1.6rem;
`;

const Strong = styled.strong`
  font-size: var(--fs-xs);
  font-weight: 700;
`;

const OctocatImg = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  cursor: pointer;
`;