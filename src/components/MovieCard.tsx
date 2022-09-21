import styled from "styled-components";
import { memo, useCallback } from "react";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const ImgContainer = styled.img`
  width: 180px;
  height: 273px;
`;

export default memo(({ movie, onClick }: Props) => {
  const onClickCallback = useCallback(() => onClick(movie), [movie, onClick]);

  return (
    <div onClick={onClickCallback}>
      <ImgContainer src={movie.posterPath} />
    </div>
  );
});
