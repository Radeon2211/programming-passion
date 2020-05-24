import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-self: flex-start;
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: var(--shadow-4);
  justify-self: center;
  max-width: 100%;
  margin-top: 2.4rem;
  padding: 2.4rem;
  width: 65rem;

  & .btn-and-loader {
    display: flex;
    align-items: center;
  }

  & .cancel-button-box {
    margin-left: 2.4rem;
  }

  & .error {
    color: var(--red);
    display: inline-block;
    font-size: 1.5rem;
    margin-top: 2.4rem;
  }
`;
