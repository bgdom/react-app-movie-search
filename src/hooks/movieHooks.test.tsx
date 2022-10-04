import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import {
  mockFetchPopularMovies,
  mockSearchMovies,
} from "../services/movies.test";
import {
  useSearchMovie,
  mapRawDataToMovies,
  usePopularMovie,
  useGetMovieList,
} from "./movieHooks";

const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Movie hooks", () => {
  beforeEach(() => queryClient.clear());

  describe("useSearchMovie", () => {
    it("should fetch the good data", async () => {
      const resultData = {
        page: 0,
        total_pages: 2,
        total_results: 4,
        results: [
          {
            id: 6,
            original_title: "test 1",
            overview: "this is a test",
            vote_average: "7.5",
            poster_path: "/this/path",
          },
          {
            id: 7,
            original_title: "test 2",
            overview: "this is a test 2",
            vote_average: "7.5",
            poster_path: "/this/path",
          },
        ],
      };

      mockSearchMovies("test", resultData);
      const { result } = renderHook(() => useSearchMovie("test"), { wrapper });
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData));
    });
  });

  describe("usePopularMovie", () => {
    it("should fetch the good data", async () => {
      const resultData = {
        page: 0,
        total_pages: 2,
        total_results: 4,
        results: [
          {
            id: 8,
            original_title: "test 1",
            overview: "this is a test",
            vote_average: "7.5",
            poster_path: "/this/path",
          },
          {
            id: 9,
            original_title: "test 2",
            overview: "this is a test 2",
            vote_average: "7.5",
            poster_path: "/this/path",
          },
        ],
      };

      mockFetchPopularMovies(resultData);
      const { result } = renderHook(() => usePopularMovie(), { wrapper });
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData));
    });
  });

  describe("useGetMovieList", () => {
    const resultData1 = {
      page: 0,
      total_pages: 2,
      total_results: 4,
      results: [
        {
          id: 12,
          original_title: "test 1",
          overview: "this is a test",
          vote_average: "7.5",
          poster_path: "/this/path",
        },
        {
          id: 2,
          original_title: "test 2",
          overview: "this is a test 2",
          vote_average: "7.5",
          poster_path: "/this/path",
        },
      ],
    };

    const resultData2 = {
      page: 1,
      total_pages: 2,
      total_results: 4,
      results: [
        {
          id: 3,
          original_title: "test 1",
          overview: "this is a test",
          vote_average: "7.5",
          poster_path: "/this/path",
        },
        {
          id: 4,
          original_title: "test 2",
          overview: "this is a test 2",
          vote_average: "7.5",
          poster_path: "/this/path",
        },
      ],
    };

    it("should fetch data from usePopularMovie", async () => {
      mockFetchPopularMovies(resultData1);
      const { result } = renderHook(({ text }) => useGetMovieList(text), {
        wrapper,
        initialProps: { text: "" },
      });
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData1));
    });

    it("should fetch data from mockSearchMovies", async () => {
      const text = "texto";
      mockSearchMovies(text, resultData2);
      const { result } = renderHook(({ text }) => useGetMovieList(text), {
        wrapper,
        initialProps: { text },
      });
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData2));
    });

    it("should fetch data from usePopularMovie and after from mockSearchMovies", async () => {
      const searchText = "texto";

      mockFetchPopularMovies(resultData1);
      const { result, rerender } = renderHook(
        ({ text }) => useGetMovieList(text),
        {
          wrapper,
          initialProps: { text: "" },
        }
      );
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData1));

      mockSearchMovies(searchText, resultData2);
      rerender({ text: searchText });
      result.current.fetchData();

      await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
      expect(result.current.data).toEqual(mapRawDataToMovies(resultData2));
    });
  });
});
