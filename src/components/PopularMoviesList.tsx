import styled from "styled-components";

import { memo } from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
  onMovieSelected: (movie: Movie) => void;
}

export default memo(({ movies, onMovieSelected }: Props) => {
  return (
    <ListContainer>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieSelected} />
      ))}
    </ListContainer>
  );
});

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));

  @media ${(props) => props.theme.media.large} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 5px;
  }

  @media ${(props) => props.theme.media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
