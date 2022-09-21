import styled from "styled-components";
import { memo } from "react";
import { Movie } from "../types/movie";

interface Props {
  movie: Movie;
}

const ImgContainer = styled.img`
  width: 180px;
  height: 273px;
`;

export default memo(({ movie }: Props) => {
  return (
    <div>
      <ImgContainer src={movie.posterPath} />
    </div>
  );
});
