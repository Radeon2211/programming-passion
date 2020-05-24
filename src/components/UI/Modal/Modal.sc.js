import styled, { css } from 'styled-components';

export const Backdrop = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  opacity: 0;
  transition: opacity 0.24s;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndexes.index5};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: initial;
    `}
`;

export const Popup = styled.div`
  background-color: #fff;
  border-radius: 1px;
  box-shadow: inset ${({ theme }) => theme.shadows.shadow5};
  color: #000;
  left: 50%;
  max-width: 100%;
  opacity: 0;
  padding: 2.4rem 1.2rem;
  pointer-events: none;
  position: fixed;
  text-align: center;
  transition: opacity 0.24s, transform 0.36s cubic-bezier(0.27, 0.89, 0.32, 1.22);
  top: 50%;
  transform: translate(-50%, -110%);
  width: 45rem;
  z-index: ${({ theme }) => theme.zIndexes.index5};

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: initial;
      transform: translate(-50%, -50%);
    `}

  & .caption {
    display: inline-block;
    font-size: 1.7rem;
    margin: 3rem 0;
  }

  & .note {
    font-weight: 700;
  }

  & .buttons {
    display: flex;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 2.4rem;
    }
  }
`;
