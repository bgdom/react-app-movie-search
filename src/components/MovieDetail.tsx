import styled from "styled-components";
import { memo, useContext } from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";
import { ThemeContext } from "../context/theme";

interface Props {
  movie: Movie;
}

const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  gap: 20px;

  @media ${(props) => props.theme.media.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const Text = styled.span`
  font-weight: bold;
  text-align: justify;
  text-justify: inter-word;
  color: ${(props) => props.theme.text};
`;

export default memo(({ movie }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <DetailContainer theme={theme}>
      <div className="flex flex-col items-start gap-5 flex-1">
        <Text theme={theme}>{movie.title}</Text>
        <Text theme={theme}>{movie.description}</Text>
        <Text theme={theme}>{movie.score}/10</Text>
      </div>
      <div className="flex-initial">
        <MovieCard movie={movie} />
      </div>
    </DetailContainer>
  );
});
