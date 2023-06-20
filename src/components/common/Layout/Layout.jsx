import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Header from './../Header/Header';

const Layout = ({ children }) => {
  return (
    <>
      <MainContainer>
        <Header />
        <SubContainer>{children}</SubContainer>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;

const MainContainer = styled.div`
  position: relative;
  min-width: 120rem;
  height: 100%;
  margin: 0 auto;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 40rem);
`;
