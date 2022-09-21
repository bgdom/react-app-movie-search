import { memo } from "react";
import { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
}

export default memo(({ movies }: Props) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.posterPath} movie={movie} />
      ))}
    </div>
  );
});
