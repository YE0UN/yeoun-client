import React from 'react';
import styled from 'styled-components';

const HeadingLayout = ({ heading }) => {
  return (
    <>
      <section>
        <H2>{heading}</H2>
      </section>
    </>
  );
};

export default HeadingLayout;

const H2 = styled.h2`
  font-size: var(--fs-4xl);
  font-weight: 700;
  margin-top: 9rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--border-color);
`;
