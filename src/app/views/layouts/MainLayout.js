import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;

  .post {
    padding: 16px;
    border: 4px solid DARKSALMON;
    margin-bottom: 16px;
    border-radius: 4px;
    background-color: CORNSILK;

    &:last-child {
      margin-bottom: 32px;
    }
  }
`;

const MainLayout = ({ children }) => <Container>{children}</Container>;

export default MainLayout;
