import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  background-color: transparent;
  border-radius: 1px;
  box-shadow: var(--shadow-2);
  color: #fff;
  cursor: pointer;
  outline: none;
  text-shadow: var(--shadow-1);
  transition: all .12s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
  }

  ${({ size }) => {
    if (size === 'small') {
      return `
        font-size: 1.8rem;
        padding: 1rem 2rem;
      `;
    }
    if (size === 'big') {
      return `
        font-size: 3rem;
        padding: 1.5rem 3.6rem;
      `;
    }
    return '';
  }}

  ${({ fill, color, theme }) => {
    if (fill === 'empty') {
      if (color === 'green') {
        return `
          &:hover {
            background-color: rgba(0, 0, 0, .03);
          }
          color: ${theme.colors.green};
          &:hover {
            border: 1px solid ${theme.colors.greenDark1};
          }
        `;
      }
      if (color === 'red') {
        return `
          color: ${theme.colors.red};
          &:hover {
            border: 1px solid ${theme.colors.redDark1};
          }
        `;
      }
    }
    if (fill === 'filled') {
      if (color === 'green') {
        return `
          background-color: ${theme.colors.green};
          &:hover {
            background-color: ${theme.colors.greenDark1};
          }
        `;
      }
      if (color === 'red') {
        return `
          background-color: ${theme.colors.red};
          &:hover {
            background-color: ${theme.colors.redDark1};
            border: 1px solid ${theme.colors.redDark1};
          }
        `;
      }
    }
    return '';
  }}

  ${({ color, disabled, theme }) => {
    if (color === 'green') {
      if (disabled) {
        return `
          background-color: var(--green-dark-2);
          border: 1px solid var(--green-dark-2);
          cursor: not-allowed;

          &:hover {
            background-color: var(--green-dark-2);
            border: 1px solid var(--green-dark-2);
          }
        `;
      }
      return `
        border: 1px solid ${theme.colors.green};
        &:hover {
          border: 1px solid ${theme.colors.greenDark1};
        }
      `;
    }
    if (color === 'red') {
      return `
        border: 1px solid ${theme.colors.red};
        &:hover {
          background-color: 1px solid ${theme.colors.redDark1};
          border: 1px solid ${theme.colors.redDark1};
        }
      `;
    }
    return '';
  }}
`;
