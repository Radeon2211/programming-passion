import React from 'react';
import styled from 'styled-components';

const SC = {};
SC.Line = styled.div`
  width: 95%;
  max-width: 60rem;

  ${({ type, theme }) => {
    if (type === 'begin') {
      return `
        background-image: linear-gradient(to right, ${theme.colors.gray4}, ${theme.colors.gray4Transparent});
      `;
    }
    if (type === 'middle') {
      return `
        background-image: linear-gradient(to right, ${theme.colors.gray4Transparent}, ${theme.colors.gray4}, ${theme.colors.gray4Transparent});
      `;
    }
    return '';
  }}

  ${({ size }) => {
    if (size === '1') return `height: 1px;`;
    if (size === '2') return `height: 2px;`;
    return '';
  }}
`;

const Line = (props) => {
  const { type, size } = props;
  return <SC.Line type={type} size={size} />;
};

export default Line;
