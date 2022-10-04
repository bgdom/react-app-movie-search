import { memo, useCallback, useEffect, useState } from "react";
import PopularMoviesList from "../components/PopularMoviesList";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useDelay } from "../hooks/customHooks";
import { useGetMovieList } from "../hooks/movieHooks";

export default memo(() => {
  const [searchedText, setSearchedText] = useState("");
  const delay = useDelay(1700, true);

  const navigate = useNavigate();
  const onMovieSelectedCallback = useCallback(
    (movie: Movie) => navigate(`/movie/${movie.id}`),
    [navigate]
  );

  const { data, fetchData } = useGetMovieList(searchedText);

  useEffect(() => {
    delay(() => fetchData());
  }, [searchedText, fetchData]);

  return (
    <div className="flex flex-col gap-3 items-stretch bg-red-100">
      <SearchBar value={searchedText} onChange={setSearchedText} />
      <PopularMoviesList
        movies={data}
        onMovieSelected={onMovieSelectedCallback}
      />
    </div>
  );
});
