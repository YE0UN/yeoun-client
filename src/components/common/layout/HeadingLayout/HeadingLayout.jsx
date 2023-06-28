import React from 'react';
import styled from 'styled-components';

const HeadingLayout = ({ heading, subHeading }) => {
  return (
    <>
      <section>
        <Wrapper>
          <H2>{heading}</H2>
          {subHeading ? <Anchor href='/profile/edit'>{subHeading}</Anchor> : <></>}
        </Wrapper>
      </section>
    </>
  );
};

export default HeadingLayout;

const Wrapper = styled.div`
  display: flex;
  gap: 5rem;
  border-bottom: 1px solid var(--border-color);
`;

const H2 = styled.h2`
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-top: 9rem;
  padding-bottom: 1.6rem;
`;

const Anchor = styled.a`
  font-size: var(--fs-md);
  font-weight: 500;
  margin-top: 10rem;
  color: var(--sub-text-color);
`;
