import React from 'react';
import styled from 'styled-components';

const InnerLayout = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default InnerLayout;

const Layout = styled.div`
  width: 120rem;
  margin: 0 auto;
`;
