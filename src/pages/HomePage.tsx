import { memo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/movies";
import PopularMoviesList from "../components/PopularMoviesList";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

export default memo(() => {
  const navigate = useNavigate();
  const onMovieSelectedCallback = useCallback(
    (movie: Movie) => navigate(`/movie/${movie.id}`),
    [navigate]
  );

  const { isLoading, data } = useQuery(["popularMovies"], fetchPopularMovies);

  if (isLoading || !data) return null;

  const movies: Movie[] = data.results.map((item) => ({
    id: item.id,
    title: item.original_title,
    description: item.overview,
    score: parseInt(item.vote_average),
    posterPath: `https://image.tmdb.org/t/p/original${item.poster_path}`,
  }));

  return (
    <div>
      <PopularMoviesList
        movies={movies}
        onMovieSelected={onMovieSelectedCallback}
      />
    </div>
  );
});
