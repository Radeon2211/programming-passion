import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  display: flex;
  padding: 1.5rem 2rem;

  .left {
    flex: 1;
  }

  .user {
    margin-top: 1.2rem;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.2rem;
  }

  .icon-box {
    align-items: center;
    border-left: 1px solid ${({ theme }) => theme.colors.gray4};
    display: flex;
    justify-content: center;
    padding: 1.2rem 0 1.2rem 1.2rem;
  }

  .icon {
    height: 1.9rem;
    fill: #fff;
    width: 1.9rem;
  }

  .icon-caption {
    font-size: 1.4rem;
    margin-left: 0.6rem;
  }

  @media only screen and (max-width: 37.5em) {
    & {
      padding: 1.2rem;
    }
  }
`;
