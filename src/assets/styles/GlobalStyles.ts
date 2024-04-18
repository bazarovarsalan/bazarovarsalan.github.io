import {createGlobalStyle} from "styled-components";
import BgImage from "../images/bg-image1.png";

const GlobalStyles = createGlobalStyle`

-webkit-appearance: none;
@font-face {
    font-family: 'Lato';
    src: local('Lato'),
        url('../assets/fonts/Lato-Bold.ttf') format('truetype'),
        url('../assets/fonts/Lato-Regular.ttf') format('truetype');
  }


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body {
    background: url(${BgImage});
    background-size: cover;
    background-attachment: fixed;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Lato', bold;
    font-size: 16px;
    color: #FFF;
}


`;

export default GlobalStyles;
