import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-self: stretch;
  display: grid;
  grid-template-rows: 1fr repeat(2, max-content) repeat(3, 1fr);
  margin: 0 auto;
  max-width: 100rem;
  max-height: 100vh;
  row-gap: 4rem;

  & .button-box {
    align-items: center;
    display: flex;
    flex-direction: column;
    grid-row: 3 / 4;
  }

  & .login-caption {
    font-size: 1.6rem;
    margin-top: 1.6rem;
  }

  & .login-link:link,
  & .login-link:visited {
    color: ${({ theme }) => theme.colors.green};
    margin-left: 0.7rem;
    text-decoration: none;
    transition: color 0.12s;

    &:hover {
      color: ${({ theme }) => theme.colors.greenDark1};
    }
  }

  & .incentive-box {
    grid-row: 4 / 5;
    text-align: center;
  }

  & .incentive-caption {
    display: block;
    font-size: 2rem;
    margin-bottom: 1.2rem;
  }
`;
