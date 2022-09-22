import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../services/movies";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";
import styled from "styled-components";

interface Props {}

export default memo(({}: Props) => {
  const { id } = useParams();

  const { isLoading, data: movie } = useQuery(
    ["movieDetail"],
    () => fetchMovieDetail(parseInt(id || "")),
    {
      select: (rawData) => ({
        id: rawData.id,
        title: rawData.original_title,
        description: rawData.overview,
        score: parseInt(rawData.vote_average),
        posterPath: rawData.poster_path
          ? `https://image.tmdb.org/t/p/original${rawData.poster_path}`
          : "",
      }),
    }
  );

  if (isLoading || !movie) return null;

  return <MovieDetail movie={movie} />;
});
