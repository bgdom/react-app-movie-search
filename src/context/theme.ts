import { createContext } from "react";
import { ThemeType } from "../types/theme";


const media = {
  large: "(max-width: 1024px)",
  tablet: "(max-width: 768px)",
};

const dark: ThemeType = {
  header: "#1F2937",
  background: "#4B5563",
  text: "white",
  media,
  toggleDarkMode: (isDark: boolean) => {},
};

const light: ThemeType = {
  header: "#60a5fa",
  background: "#FFFFF",
  text: "black",
  media,
  toggleDarkMode: (isDark: boolean) => {},
};

export const themes = {
  light, dark
}

export const ThemeContext = createContext<ThemeType>(themes.dark);
