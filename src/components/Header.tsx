import styled from "styled-components";
import { IoIosArrowBack as ArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #60a5fa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 40px;
`;

export default () => {
  const [switchChecked, setSwitch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onBack = useCallback(() => navigate(-1), [navigate]);
  const displayArrowBack = location.pathname.startsWith("/movie/");

  return (
    <HeaderContainer>
      {displayArrowBack ? <ArrowBack onClick={onBack} /> : <div />}

      <div>MOVIES</div>
      <Switch onChange={() => {}} checked={switchChecked} />
    </HeaderContainer>
  );
};
