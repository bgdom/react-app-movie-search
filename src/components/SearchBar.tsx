import styled from "styled-components";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { ImCross as Cross } from "react-icons/im";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const SearchBarContainer = styled.div`
  border: 2px solid gray;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
`;

export default memo(({ value, onChange }: Props) => {
  const onChangeCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onChange(event.target.value.trim()),
    [onChange]
  );

  const onCrossClicked = useCallback(() => onChange(""), [onChange]);

  return (
    <SearchBarContainer>
      <input value={value} onChange={onChangeCallback} />
      <Cross onClick={onCrossClicked} />
    </SearchBarContainer>
  );
});
