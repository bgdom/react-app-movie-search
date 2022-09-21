import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPopularMovies } from "../services/movies";

const HomePage = memo((props) => {
  const { isLoading, data } = useQuery(["popularMovies"], fetchPopularMovies);

  if (isLoading) return null;

  return <div>{JSON.stringify(data)}</div>;
});

export default HomePage;
