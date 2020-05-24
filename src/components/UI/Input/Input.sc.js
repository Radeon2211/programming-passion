import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 2.4rem;
`;

export const Input = styled.input`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  color: #fff;
  font-size: 1.5rem;
  font-family: inherit;
  outline: none;
  padding: 0.9rem 1rem;
  transition: border-bottom 0.12s;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }

  &:focus {
    border-bottom: 3px solid rgba(0, 0, 0, 0.35);
  }

  ${Wrapper}.valid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.green};
  }

  ${Wrapper}.invalid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.red};
  }
`;

export const Textarea = styled.textarea`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.shadow1};
  box-sizing: initial;
  color: #fff;
  display: block;
  font-size: 1.5rem;
  font-family: inherit;
  outline: none;
  overflow: hidden;
  padding: 0.9rem 1rem;
  transition: border-bottom 0.12s;
  resize: none;
  width: calc(100% - 2rem);

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }

  &:focus {
    border-bottom: 3px solid rgba(0, 0, 0, 0.35);
  }

  ${Wrapper}.valid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.green};
  }

  ${Wrapper}.invalid & {
    border-bottom: 3px solid ${({ theme }) => theme.colors.red};
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.6rem;
  transition: color 0.12s;

  ${Wrapper}.valid & {
    color: ${({ theme }) => theme.colors.green};
  }

  ${Wrapper}.invalid & {
    color: ${({ theme }) => theme.colors.red};
  }
`;
