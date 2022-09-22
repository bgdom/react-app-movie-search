import styled from "styled-components";
import ReactHover, { Trigger, Hover } from "react-hover";
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
        <div key={movie.id}>
          <ReactHover options={{}}>
            <Trigger type="trigger">
              <MovieCard movie={movie} onClick={onMovieSelected} />
            </Trigger>
            <Hover type="hover">
              <Title>{movie.title}</Title>
            </Hover>
          </ReactHover>
        </div>
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

const Title = styled.span`
  color: black;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 3px;
  background-color: white;
  font-size: 0.7em;
`;
