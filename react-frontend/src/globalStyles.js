import {CreateGlobalStyle, createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        marign: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Open Sans';
        display: flex;
        padding-top: 42px;
        justify-content: center;
    }
`;

export default GlobalStyle;

