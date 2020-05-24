import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: flex;

  & .photo {
    border-radius: 50%;
    box-shadow: ${({ theme }) => theme.shadows.shadow2};
    object-fit: cover;
    overflow: hidden;
  }

  & .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.2rem;
  }

  & .name {
    color: ${({ theme }) => theme.colors.gray3};
  }

  & .date {
    color: ${({ theme }) => theme.colors.gray4};
  }

  ${({ size }) => {
    if (size === 'small') {
      return `
        & .photo {
          height: 4.5rem;
          width: 4.5rem;
        }

        & .name {
          font-size: 1.4rem;
          margin-bottom: .3rem;
        }

        & .date {
          font-size: 1.2rem;
        }
      `;
    }
    if (size === 'big') {
      return `
        & .photo {
          height: 5.5rem;
          width: 5.5rem;
        }

        & .name {
          font-size: 1.7rem;
          margin-bottom: .4rem;
        }

        & .date {
          font-size: 1.4rem;
        }
      `;
    }
    return '';
  }}
`;
