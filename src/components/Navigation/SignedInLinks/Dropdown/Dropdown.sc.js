import styled, { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: 1px;
  box-shadow: ${({ theme }) => theme.shadows.shadow4};
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: calc(100% + 1.2rem);
  transform: translateY(-10%);
  transition: all 0.3s;
  right: 0;
  width: 25rem;
  z-index: ${({ theme }) => theme.zIndexes.index4};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: initial;
      transform: translateY(0);
    `}

  & .list {
    list-style: none;
  }

  & .item {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  & .link:link,
  & .link:visited {
    align-items: center;
    display: flex;
    justify-content: center;
    text-align: center;
    text-shadow: ${({ theme }) => theme.shadows.shadow1};
    width: 100%;
    padding: 1.5rem;
    text-decoration: none;
    transition: background-color 0.12s;
    font-size: 1.7rem;
    color: #fff;

    &:hover {
      background-color: ${({ theme }) => theme.colors.greenDark1};
    }
  }

  & .icon {
    width: 2.6rem;
    height: 2.6rem;
    fill: #fff;
    filter: drop-shadow(${({ theme }) => theme.shadows.shadow1});
    margin-left: 1.2rem;
  }
`;
