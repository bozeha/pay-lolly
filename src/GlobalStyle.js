// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,html,#root,.App {
    height:100%;
    width:100%;
    margin: 0;
    padding: 0;
    background: lightgray;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
.App{
  position: relative;
}
`;
export default GlobalStyle;