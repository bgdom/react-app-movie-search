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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-items-center">
      {movies.map((movie) => (
        <div key={movie.id}>
          <ReactHover options={{}}>
            <Trigger type="trigger">
              <MovieCard movie={movie} onClick={onMovieSelected} />
            </Trigger>
            <Hover type="hover">
              <span className="text-black p-3 bg-white text-xs border border-solid border-gray-50 rounded">
                {movie.title}
              </span>
            </Hover>
          </ReactHover>
        </div>
      ))}
    </div>
  );
});
