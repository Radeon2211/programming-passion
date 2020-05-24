import styled from 'styled-components';

export const List = styled.div`
  margin-top: 4.8rem;

  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  & .post-link:link,
  & .post-link:visited {
    color: #fff;
    display: block;
    flex: 1;
    text-decoration: none;
  }
`;

export const DeletePostWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: stretch;

  & .icons {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > * {
      margin: 1.2rem 0 1.2rem 1.2rem;
    }
  }

  & .edit-post-icon {
    cursor: pointer;
    fill: #fff;
    height: 2.8rem;
    width: 2.8rem;
  }

  & .delete-post-icon {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.red};
    height: 3rem;
    width: 3rem;
  }
`;
