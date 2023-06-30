import React from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import Button from './../../../components/common/Button/Button';
import styled from 'styled-components';

const Mypage = () => {
  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='마이 페이지' subHeading='회원 정보 설정' />
        <ButtonContainer>
          <Button size='myPage' disabled={false}>
            내가 쓴 글
          </Button>
          <Button size='myPage' disabled={true}>
            내가 쓴 댓글
          </Button>
          <Button size='myPage' disabled={true}>
            스크랩
          </Button>
        </ButtonContainer>
      </InnerLayout>
    </>
  );
};

export default Mypage;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
`;
