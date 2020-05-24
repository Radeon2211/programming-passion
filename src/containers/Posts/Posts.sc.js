import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;

  & .no-posts-link:link,
  & .no-posts-link:visited {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.green};
  }
`;
