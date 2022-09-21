import { memo } from "react";
import { Movie } from "../types/movie";

interface Props {
  movies: Movie[];
}

export default memo(({ movies }: Props) => {
  return (
    <div>
      {movies.map((movie) => (
        <div>{JSON.stringify(movie)}</div>
      ))}
    </div>
  );
});
