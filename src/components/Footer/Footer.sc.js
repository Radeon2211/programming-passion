import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  margin: 8rem 2rem 3rem;
  text-align: center;

  & .copyright {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 1.6rem;
  }

  & .socials {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  & .social-link:link,
  & .social-link:visited {
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;

    &:nth-child(2) {
      align-items: center;
      display: flex;
    }
  }

  & .social-icon {
    fill: #fff;
    height: 3.2rem;
    margin: 0 1.2rem;
    vertical-align: middle;
    width: 3.2rem;
  }
`;
