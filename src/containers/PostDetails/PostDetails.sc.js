import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.shadow3};
  max-width: 80rem;
  padding: 3rem 2rem;
  width: 100%;

  & .author {
    margin-bottom: 1.2rem;
  }

  & .content {
    font-size: 1.8rem;
    margin: 4.8rem 0;
    text-align: justify;
  }

  & .unauth-info {
    align-items: center;
    display: flex;
    margin: 2.4rem 0;
  }

  & .lock-icon {
    height: 2rem;
    fill: #fff;
    width: 2rem;
  }

  & .unauth-caption {
    font-size: 1.4rem;
    margin-left: 0.3rem;
  }

  & .unauth-caption-link:link,
  & .unauth-caption-link:visited {
    color: ${({ theme }) => theme.colors.green};
    text-decoration: none;
    transition: color 0.12s;

    &:hover {
      color: ${({ theme }) => theme.colors.greenDark1};
    }
  }
`;

export const Likes = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 2.4rem;

  & .like-icon-box {
    border: 1px solid ${({ theme }) => theme.colors.gray4};
    border-radius: 50%;
    cursor: pointer;
    padding: 0.9rem 0.9rem 0.7rem;
    transition: all 0.12s;

    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.shadow3};
    }

    ${({ liked }) =>
      liked &&
      css`
        border: 1px solid ${({ theme }) => theme.colors.green};
      `}
  }

  & .like-icon {
    fill: #fff;
    height: 2.4rem;
    transition: all 0.12s;
    width: 2.4rem;

    ${({ liked }) =>
      liked &&
      css`
        fill: ${({ theme }) => theme.colors.green};
      `}
  }

  & .like-icon-box:hover .like-icon {
    filter: drop-shadow(${({ theme }) => theme.shadows.shadow2};);
  }

  & .like-icon-caption {
    font-size: 1.6rem;
    margin-left: 1.2rem;
    transition: color 0.12s;

    ${({ liked }) =>
      liked &&
      css`
        color: ${({ theme }) => theme.colors.green};
      `}
  }
`;
