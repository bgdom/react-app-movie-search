import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../services/movies";
import { useParams } from "react-router-dom";

interface Props {}

export default memo(({}: Props) => {
  const { id } = useParams();

  const { isLoading, data } = useQuery(
    ["movieDetail"],
    () => fetchMovieDetail(parseInt(id || "")),
    {
      select: (rawData) => ({
        id: rawData.id,
        title: rawData.original_title,
        description: rawData.overview,
        score: parseInt(rawData.vote_average),
        posterPath: `https://image.tmdb.org/t/p/original${rawData.poster_path}`,
      }),
    }
  );

  if (isLoading || !data) return null;

  return <div>{JSON.stringify(data)}</div>;
});
