import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 3.6rem;
  }

  & .user {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  & .user-photo-link {
    margin-bottom: 1.2rem;
  }

  & .user-photo {
    border-radius: 50%;
    box-shadow: var(--shadow-2);
    height: 15rem;
    object-fit: cover;
    width: 15rem;
  }

  & .user-link:link,
  & .user-link:visited {
    color: #fff;
    text-decoration: none;
    margin-bottom: 1.2rem;
    font-size: 1.9rem;
    text-align: center;
  }

  & .buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  & .button-link {
    margin: 0 1.2rem 2.4rem;
  }

  & .success {
    color: var(--green);
    font-size: 1.7rem;
    text-align: center;
  }

  & .admin-section {
    display: block;

    & > *:not(:last-child) {
      margin-right: 2.4rem;
    }
  }
`;
