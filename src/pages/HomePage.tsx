import { memo, useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPopularMovies,
  PopularMoviesRequestResult,
  searchMovies,
} from "../services/movies";
import PopularMoviesList from "../components/PopularMoviesList";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const mapRawDataToMovies = (rawData: PopularMoviesRequestResult) =>
  rawData.results.map((item) => ({
    id: item.id,
    title: item.original_title,
    description: item.overview,
    score: parseInt(item.vote_average),
    posterPath: item.poster_path
      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
      : "",
  }));

export default memo(() => {
  const [searchedText, setSearchedText] = useState("");

  const navigate = useNavigate();
  const onMovieSelectedCallback = useCallback(
    (movie: Movie) => navigate(`/movie/${movie.id}`),
    [navigate]
  );

  const { isLoading: isLoadingPopularMovies, data: popularMovies } = useQuery(
    ["popularMovies"],
    fetchPopularMovies,
    {
      select: mapRawDataToMovies,
    }
  );

  const { data: searchedMovies } = useQuery(
    ["searchedMovies", searchedText],
    () => searchMovies(searchedText),
    {
      select: mapRawDataToMovies,
      enabled: !!searchedText,
    }
  );

  if (isLoadingPopularMovies && !searchedText) return null;

  return (
    <div>
      <SearchBar value={searchedText} onChange={setSearchedText} />
      <PopularMoviesList
        movies={(searchedText ? searchedMovies : popularMovies) || []}
        onMovieSelected={onMovieSelectedCallback}
      />
    </div>
  );
});
