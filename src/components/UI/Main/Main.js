import React from 'react';
import styled from 'styled-components';

const SC = {};
SC.Main = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  margin: 0 1.5rem;
  min-height: 100vh;
  padding-top: 10rem;
`;

const Main = ({ children }) => <SC.Main>{children}</SC.Main>;

export default Main;
