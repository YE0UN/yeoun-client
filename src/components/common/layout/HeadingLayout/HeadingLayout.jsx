import React from 'react';
import styled from 'styled-components';
import settingIcon from '../../../../assets/images/setting-icon.svg';

const HeadingLayout = ({ heading, subHeading }) => {
  return (
    <>
      <section>
        <Wrapper>
          <H2>{heading}</H2>
          {subHeading ? (
            <Anchor href='/profile/edit'>
              <SettingIcon src={settingIcon} alt='회원 정보 설정 아이콘' />
              {subHeading}
            </Anchor>
          ) : (
            <></>
          )}
        </Wrapper>
      </section>
    </>
  );
};

export default HeadingLayout;

const Wrapper = styled.div`
  display: flex;
  gap: 4rem;
  border-bottom: 1px solid var(--border-color);
`;

const H2 = styled.h2`
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-top: 9rem;
  padding-bottom: 1.6rem;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 4rem;
  margin-top: 9rem;
  font-size: var(--fs-md);
  font-weight: 500;
  color: var(--sub-text-color);
`;

const SettingIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0 0.6rem 0 0;
`;
