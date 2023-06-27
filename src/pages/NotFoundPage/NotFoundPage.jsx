import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const onClickgoHomeHandler = () => {
    navigate('/');
  };

  return (
    <Container>
      <LogoImg src={logo} alt='여운 로고' onClick={onClickgoHomeHandler} />
      <Heading>404</Heading>
      <SubHeading>Page Not Found</SubHeading>
      <Message>Sorry, the page you are looking for does not exist.</Message>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 9999;
  background: var(--modal-sub-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  width: 20rem;
  height: 6rem;
  margin-bottom: 4rem;
  cursor: pointer;
`;

const Heading = styled.h1`
  font-size: 8rem;
  color: var(--main-alert-color);
  margin-bottom: 2rem;
`;

const SubHeading = styled.h2`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: 1.8rem;
  color: var(--sub-alert-color);
`;

export default NotFoundPage;
