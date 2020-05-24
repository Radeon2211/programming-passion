import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  margin-top: 4.8rem;
  text-align: center;

  & .post-options-icons {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 3rem;

    & > *:not(:last-child) {
      margin-right: 3rem;
    }
  }

  & .edit-post-icon {
    cursor: pointer;
    fill: #fff;
    height: 3.4rem;
    width: 3.4rem;
  }

  & .delete-post-icon {
    cursor: pointer;
    fill: var(--red);
    height: 3.6rem;
    width: 3.6rem;
  }
`;
