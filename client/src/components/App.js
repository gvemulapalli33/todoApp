import React, {useState} from "react";
import Todos from "./pages/Todos";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme, darkTheme, primaryFont, typeScale } from "../utils";
import styled from "styled-components";

const App = () => {
const Button = styled.button`
  padding: 8px 12px;
  border-radius: 2px;
  min-width: 100px;
  cursor: pointer;
  font-family: ${primaryFont};
  font-size: ${typeScale.paragraph};
  transition: background-color 0.2s linear, color 0.2s linear;

  &:hover {
    background-color: ${props => props.theme.primaryHoverColor};
    color: ${props => props.theme.textColorOnPrimary};
  }

  &:focus {
    outline: 3px solid ${props => props.theme.primaryHoverColor};
    outline-offset: 2px;
  }

  &:active {
    background-color: ${props => props.theme.primaryActiveColor};
    border-color: ${props => props.theme.primaryActiveColor};
    color: ${props => props.theme.textColorOnPrimary};
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.textColorOnPrimary};
  border: 2px solid transparent;

  &:disabled {
    background-color: ${props => props.theme.disabled};
    color: ${props => props.theme.textOnDisabled};
    cursor: not-allowed;
  }
`;

  const [useDarkTheme, setUseDarkTheme] = useState(false);
    return (
      <ThemeProvider theme={useDarkTheme ? darkTheme : defaultTheme}>
        <PrimaryButton
          style={{ margin: "0 16px 24px", padding: "8px", background: "none",  position: 'absolute', right: "25px"}}
          onClick={() => setUseDarkTheme(true)}
        >
          Dark theme
        </PrimaryButton>
        <PrimaryButton
          style={{ margin: "0 16px 24px", padding: "8px", background: "none", position: 'absolute', right: "5px"}}
          onClick={() => setUseDarkTheme(false)}
        >
          Default theme
        </PrimaryButton>
        <Todos/>
        <GlobalStyle />
      </ThemeProvider>
      );
}

export default App;
