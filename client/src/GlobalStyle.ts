import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  input {
    text-align: center;
  }

  input:focus {
    outline: none;
  }
  `;

export default GlobalStyle;
