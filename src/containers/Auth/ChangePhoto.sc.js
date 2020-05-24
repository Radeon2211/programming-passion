import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  & .content {
    margin-bottom: 2.4rem;
  }

  & .label {
    cursor: pointer;
    display: inline-block;

    & > button {
      pointer-events: none;
      transition: all 0.12s;
    }

    &:hover > button {
      background-color: rgba(0, 0, 0, 0.03);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }

  & .error {
    color: ${({ theme }) => theme.colors.red};
    display: inline-block;
    font-size: 1.6rem;
    margin-top: 2.4rem;
  }

  & .photo-box {
    border-left: 1px solid ${({ theme }) => theme.colors.gray4};
    margin-left: 2.4rem;
    padding-left: 2.4rem;
  }

  & .photo {
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadows.shadow2};
    height: 8rem;
    object-fit: cover;
    vertical-align: middle;
    width: 8rem;
  }

  & .input {
    display: none;
  }

  @media only screen and (max-width: 37.5em) {
    & .photo-box {
      margin-left: 1.8rem;
      padding-left: 1.8rem;
    }
  }
`;

export const Preview = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin-top: 2.4rem;

  & .file-data-row {
    display: block;
    word-break: break-all;

    &:not(:last-child) {
      margin-bottom: 1.2rem;
    }
  }

  & .file-data-caption {
    font-weight: 700;
  }
`;
