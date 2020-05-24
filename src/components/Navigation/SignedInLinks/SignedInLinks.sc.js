import styled, { css } from 'styled-components';

export const Wrapper = styled.nav`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 2.4rem;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  & .photo {
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadows.shadow2};
    height: 4.5rem;
    object-fit: cover;
    overflow: hidden;
    width: 4.5rem;
  }
`;

export const Arrow = styled.div`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 9px solid #fff;
  box-shadow: ${({ theme }) => theme.shadows.shadow2};
  height: 0;
  margin-left: 1.2rem;
  transform: rotate(0);
  transition: transform 0.3s;
  width: 0;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(180deg);
    `}
`;
