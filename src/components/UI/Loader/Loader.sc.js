import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Loader = styled.div`
  display: inline-block;
  margin: 0 2rem;

  &::after {
    animation: loader-rotate 1.2s linear infinite;
    border-radius: 50%;
    content: ' ';
    display: block;
  }

  ${({ size }) => {
    if (size === 'small') {
      return `
        height: 4rem;
        width: 4rem;

        &::after {
          border: 4px solid #fff;
          border-color: #fff transparent #fff transparent;
          height: 4rem;
          width: 4rem;
        }
      `;
    }
    if (size === 'big') {
      return `
        height: 8rem;
        width: 8rem;

        &::after {
          border: 6px solid #fff;
          border-color: #fff transparent #fff transparent;
          height: 6.4rem;
          width: 6.4rem;
        }
      `;
    }
    return '';
  }}

  @keyframes loader-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
