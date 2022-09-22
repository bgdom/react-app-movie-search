import styled from "styled-components";
import { IoIosArrowBack as ArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme.header};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 35px;
`;

interface Props {
  onDarkModeChanged: (isDark: boolean) => void;
}

export default ({ onDarkModeChanged }: Props) => {
  const [switchChecked, setSwitch] = useState(false);
  const switchCallback = useCallback(
    (checked: boolean) => {
      setSwitch(checked);
      onDarkModeChanged(checked);
    },
    [onDarkModeChanged]
  );

  const location = useLocation();
  const navigate = useNavigate();

  const onBack = useCallback(() => navigate(-1), [navigate]);
  const displayArrowBack = location.pathname.startsWith("/movie/");

  return (
    <HeaderContainer>
      {displayArrowBack ? <ArrowBack onClick={onBack} /> : <div />}

      <Title>Movies</Title>
      <Switch onChange={switchCallback} checked={switchChecked} />
    </HeaderContainer>
  );
};

const Title = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.2em;
`;
