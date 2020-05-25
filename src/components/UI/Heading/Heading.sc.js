import React from 'react';
import styled, { css } from 'styled-components';

const StyledHeading = styled.h1`
  ${({ variant, theme }) => {
    if (variant === 'h1') {
      return `
        font-family: ${theme.fonts.homeHeading};
        font-size: 5.2rem;
        grid-row: 2 / 3;
        letter-spacing: 1px;
        text-shadow: ${theme.shadows.shadow3};

        & > * {
          display: block;
        }
      `;
    }
    if (variant === 'h2') {
      return `
        font-size: 3.5rem;
        font-family: ${theme.fonts.logo};
        font-weight: 400;
        letter-spacing: 2px;
        line-height: 1;
        text-shadow: ${theme.shadows.shadow3};
      `;
    }
    if (variant === 'h3') {
      return `
        font-size: 3.2rem;
        font-family: ${theme.fonts.heading};
        letter-spacing: 1px;
        text-shadow: ${theme.shadows.shadow3};
      `;
    }
    if (variant === 'h4') {
      return `
        font-size: 2.5rem;
        letter-spacing: 1px;
        text-shadow: ${theme.shadows.shadow3};
      `;
    }
    if (variant === 'h5') {
      return `
        font-size: 2rem;
        letter-spacing: 1px;
        text-shadow: ${theme.shadows.shadow2};
      `;
    }
    return `
      font-size: 1.8rem;
      text-shadow: ${theme.shadows.shadow2};
    `;
  }}

  ${({ align }) => {
    if (align === 'left') {
      return css`
        text-align: left;
      `;
    }
    if (align === 'center') {
      return css`
        text-align: center;
      `;
    }
    return '';
  }}

  ${({ color }) => {
    if (color === 'black') {
      return css`
        color: #000;
      `;
    }
    return '';
  }}

  ${({ thickness }) => {
    if (thickness === 'thin') {
      return css`
        font-weight: 400;
      `;
    }
    return '';
  }}

  ${({ mgTop }) => {
    if (mgTop === '4') {
      return css`
        margin-top: 4.8rem;
      `;
    }
    return '';
  }}

  ${({ mgBottom }) => {
    if (mgBottom === '1') {
      return css`
        margin-bottom: 1.2rem;
      `;
    }
    if (mgBottom === '2') {
      return css`
        margin-bottom: 2.4rem;
      `;
    }
    return '';
  }}
`;

// eslint-disable-next-line import/prefer-default-export
export const Heading = ({ variant, ...rest }) => (
  <StyledHeading as={variant} variant={variant} {...rest} />
);
