import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = ({ description, margin }) => (
  <LoadingContainer style={{ margin }}>
    <LoadingSpinner />
    <LoadingText>{description}</LoadingText>
  </LoadingContainer>
);

export default Loading;

// 로딩 애니메이션을 정의하는 keyframes
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 스타일드 컴포넌트로 로딩 컴포넌트 생성
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 15rem;
  height: 15rem;
  border: 2rem solid rgba(13, 58, 100, 0.3);
  border-top-color: rgba(13, 58, 100, 1);
  border-radius: 50%;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingText = styled.p`
  margin: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: rgba(13, 58, 100, 1);
`;
