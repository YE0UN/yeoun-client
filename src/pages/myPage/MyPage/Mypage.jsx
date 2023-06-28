import React from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';

const Mypage = () => {
  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='마이 페이지' subHeading='회원 정보 설정' />
      </InnerLayout>
    </>
  );
};

export default Mypage;
