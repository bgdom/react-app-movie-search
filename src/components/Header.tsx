import styled from "styled-components";
import { IoIosArrowBack as ArrowBack } from "react-icons/io";
import Switch from "react-switch";
import { useState } from "react";

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

  return (
    <HeaderContainer>
      <ArrowBack />
      <div>MOVIES</div>
      <Switch onChange={() => {}} checked={switchChecked} />
    </HeaderContainer>
  );
};
