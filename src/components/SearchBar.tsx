import styled from "styled-components";
import { ChangeEvent, memo, useCallback } from "react";
import { ImCross as Cross } from "react-icons/im";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const SearchBarContainer = styled.div`
  border: 1px solid gray;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const Input = styled.input`
  flex: 1;
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
      <Input
        value={value}
        onChange={onChangeCallback}
        placeholder="Rechercher un film"
      />
      {value && <Cross size="0.8em" onClick={onCrossClicked} />}
    </SearchBarContainer>
  );
});
