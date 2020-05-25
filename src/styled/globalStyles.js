import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, ul, ol, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    background-color: ${({ theme }) => theme.colors.theme};
  }

  @media only screen and (min-width: 112.5em) {
    html { font-size: 68.75%; }
  }

  @media only screen and (max-width: 56.25em) {
    html { font-size: 56.25%; }
  }

  @media only screen and (max-width: 37.5em) {
    html { font-size: 50%; }
  }

  body {
    color: #fff;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body::-webkit-scrollbar {
    height: 19px;
    width: 19px;
  }

  body::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.theme};
    border-left: 1px solid ${({ theme }) => theme.colors.themeDark};
    box-shadow: inset 0 0 5px ${({ theme }) => theme.colors.themeDark};
  }

  body::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.green};
    border-radius: 10px;
  }

  .fade-enter-active {
    animation: show .3s forwards;
  }

  .fade-exit-active {
    animation: hide .3s forwards;
  }

  @keyframes show {
    0% { opacity: 0; transform: scale(.8); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes hide {
    0% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(.8); }
  }
`;

export default GlobalStyles;
