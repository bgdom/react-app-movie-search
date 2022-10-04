import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ThemeContext, themes } from "../context/theme";
import { ThemeType } from "../types/theme";

export default () => {
  const [currentTheme, setTheme] = useState<ThemeType>(themes.light);

  const handleDarkModeChange = useCallback((isDark: boolean) => {
    if (isDark) setTheme(themes.dark);
    else setTheme(themes.light);
  }, []);

  currentTheme.toggleDarkMode = handleDarkModeChange;

  return (
    <div className={currentTheme === themes.dark ? "dark" : ""}>
      <ThemeContext.Provider value={currentTheme}>
        <div className="dark:bg-kind-gray bg-white h-auto min-h-screen min-w-[380px]">
          <Header />
          <div className="flex flex-col items-center">
            <div className="w-[380px] sm:w-[590px] md:w-[770px] lg:w-[950px] flex flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
};
