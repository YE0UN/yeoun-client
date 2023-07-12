import React, { useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import Button from './../../../components/common/Button/Button';
import styled from 'styled-components';
import MyPosts from './../MyPosts/MyPosts';
import MyComments from './../MyComments/MyComments';
import MyScrapedPosts from './../MyScrapedPosts/MyScrapedPosts';

const Mypage = () => {
  const [activeButton, setActiveButton] = useState('내가 쓴 글'); // 활성화된 버튼을 추적하는 상태

  const handleButtonClick = (buttonLabel) => {
    setActiveButton(buttonLabel);
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='마이 페이지' subHeading='회원 정보 설정' />
        <ButtonContainer>
          <Button
            size='myPage'
            active={activeButton === '내가 쓴 글'}
            onClickHandler={() => handleButtonClick('내가 쓴 글')}
          >
            내가 쓴 글
          </Button>
          <Button
            size='myPage'
            active={activeButton === '내가 쓴 댓글'}
            onClickHandler={() => handleButtonClick('내가 쓴 댓글')}
          >
            내가 쓴 댓글
          </Button>
          <Button size='myPage' active={activeButton === '스크랩'} onClickHandler={() => handleButtonClick('스크랩')}>
            스크랩
          </Button>
        </ButtonContainer>
        {activeButton === '내가 쓴 글' && <MyPosts />}
        {activeButton === '내가 쓴 댓글' && <MyComments />}
        {activeButton === '스크랩' && <MyScrapedPosts />}
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
  margin-bottom: 5rem;
`;
