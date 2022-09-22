import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "../components/Header";

const dark = {
  header: "#1F2937",
  background: "#4B5563",
};

const light = {
  header: "#60a5fa",
  background: "#FFFFF",
};

export default () => {
  const [currentTheme, setTheme] = useState(light);
  const handleDarkModeChange = useCallback((isDark: boolean) => {
    if (isDark) setTheme(dark);
    else setTheme(light);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Header onDarkModeChanged={handleDarkModeChange} />
      <OutledContainer>
        <OutledWidthContainer>
          <Outlet />
        </OutledWidthContainer>
      </OutledContainer>
    </ThemeProvider>
  );
};

const OutledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  background-color: ${(props) => props.theme.background};
`;

const OutledWidthContainer = styled.div`
  width: 920px;
`;
