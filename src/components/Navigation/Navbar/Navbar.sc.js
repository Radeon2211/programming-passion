import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.theme};
  box-shadow: 0 1px 6px 2px rgba(0, 0, 0, 0.4);
  display: flex;
  position: fixed;
  justify-content: space-between;
  left: 0;
  padding: 1rem 5rem;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.index3};

  & .logo {
    height: 4.6rem;
    display: none;
    vertical-align: middle;
  }

  & .heading-link:link,
  & .heading-link:visited {
    color: #fff;
    text-decoration: none;
  }

  @media only screen and (max-width: 56.25em) {
    & .heading-text {
      display: none;
    }

    & .logo {
      display: initial;
    }
  }

  @media only screen and (max-width: 37.5em) {
    & {
      padding: 1rem 2rem;
    }
  }
`;
