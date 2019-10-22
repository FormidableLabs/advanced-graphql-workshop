import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    font-family: Verdana, Geneva, sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;
