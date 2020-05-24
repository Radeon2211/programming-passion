import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  margin: 2.4rem 0;

  & .author-data-and-icons {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  & .icons {
    align-items: center;
    display: flex;

    & > *:not(:last-child) {
      margin-right: 1.8rem;
    }
  }

  & .delete-icon {
    cursor: pointer;
    height: 2.1rem;
    fill: var(--red);
    width: 2.1rem;
  }

  & .edit-icon {
    cursor: pointer;
    height: 2rem;
    fill: #fff;
    width: 2rem;
  }

  & .content {
    font-size: 1.6rem;
    margin-top: 1.2rem;
    text-align: justify;
    word-break: break-all;
  }
`;
