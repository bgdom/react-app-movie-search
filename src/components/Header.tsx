import { useState, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoIosArrowBack as ArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { ThemeContext } from "../context/theme";

export default () => {
  const [switchChecked, setSwitch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useContext(ThemeContext);

  const switchCallback = useCallback(
    (checked: boolean) => {
      setSwitch(checked);
      theme.toggleDarkMode(checked);
    },
    [theme]
  );

  const onBack = useCallback(() => navigate(-1), [navigate]);
  const displayArrowBack = location.pathname.startsWith("/movie/");

  return (
    <header className="dark:bg-header-dark bg-header-light flex flex-row justify-between items-center h-9">
      {displayArrowBack ? <ArrowBack onClick={onBack} /> : <div />}

      <span className="text-white font-bold text-xl">Movies</span>
      <Switch onChange={switchCallback} checked={switchChecked} />
    </header>
  );
};
