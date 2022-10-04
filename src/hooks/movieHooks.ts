import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies, PopularMoviesRequestResult, searchMovies } from "../services/movies";
import { Movie } from "../types/movie";

export const mapRawDataToMovies = (rawData: PopularMoviesRequestResult): Movie[] =>
  rawData.results.map((item) => ({
    id: item.id,
    title: item.original_title,
    description: item.overview,
    score: parseInt(item.vote_average),
    posterPath: item.poster_path
      ? `https://image.tmdb.org/t/p/original${item.poster_path}`
      : "",
  }));

export interface UseGetMovie {
  isLoading: boolean,
  isSuccess: boolean,
  data: Movie[],
  fetchData: () => void,
}

export const useSearchMovie = (text: string): UseGetMovie => {
  const { data, refetch: fetchData, isLoading, isSuccess } = useQuery(
    ["searchedMovies", text],
    () => searchMovies(text),
    {
      select: mapRawDataToMovies,
      enabled: false,
    }
  );

  return {
    data: data || [],
    isLoading,
    isSuccess,
    fetchData,
  }
}

export const usePopularMovie = (): UseGetMovie => {
  const {
    data,
    isLoading,
    isSuccess,
    refetch: fetchData,
  } = useQuery(["popularMovies"], fetchPopularMovies, {
    select: mapRawDataToMovies,
    enabled: false,
  });

  return {
    data: data || [],
    isLoading,
    isSuccess,
    fetchData,
  }
}

export const useGetMovieList = (text: string): UseGetMovie => {
  const popular = usePopularMovie()
  const search = useSearchMovie(text)

  return text ? search : popular
}