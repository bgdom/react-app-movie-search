import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "../components/Header";

const media = {
  large: "(max-width: 1024px)",
  tablet: "(max-width: 768px)",
};

const dark = {
  header: "#1F2937",
  background: "#4B5563",
  text: "white",
  media,
};

const light = {
  header: "#60a5fa",
  background: "#FFFFF",
  text: "black",
  media,
};

export default () => {
  const [currentTheme, setTheme] = useState(light);
  const handleDarkModeChange = useCallback((isDark: boolean) => {
    if (isDark) setTheme(dark);
    else setTheme(light);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <Header onDarkModeChanged={handleDarkModeChange} />
        <OutledContainer>
          <OutledWidthContainer>
            <Outlet />
          </OutledWidthContainer>
        </OutledContainer>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
  height: auto;
`;

const OutledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const OutledWidthContainer = styled.div`
  width: 920px;

  @media ${(props) => props.theme.media.large} {
    width: 98%;
    min-width: 380px;
  }
`;
