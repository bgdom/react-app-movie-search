export const API_KEY = '8b74585b34628152a3fa07600dea420d';
export const API_BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieRequestResult {
  id: number
  original_title: string
  overview: string
  vote_average: string
  poster_path: string
}

export interface PopularMoviesRequestResult {
  page: number
  total_pages: number
  total_results: number
  results: MovieRequestResult[]
}

export const SEARCH_MOVIES_PATH = `/search/movie`
export const GET_POPULAR_MOVIES_PATH = `/movie/popular`
export const FETCH_MOVIE_DETAIL = `/movie/`

export const fetchPopularMovies = (): Promise<PopularMoviesRequestResult> =>
  fetch(`${API_BASE_URL}${GET_POPULAR_MOVIES_PATH}?api_key=${API_KEY}`).then(result => result.json())

export const fetchMovieDetail = (id: number): Promise<MovieRequestResult> =>
  fetch(`${API_BASE_URL}${FETCH_MOVIE_DETAIL}${id}?api_key=${API_KEY}`).then(result => result.json())

export const searchMovies = (text: string): Promise<PopularMoviesRequestResult> =>
  fetch(`${API_BASE_URL}${SEARCH_MOVIES_PATH}?api_key=${API_KEY}&query=${encodeURI(text)}`).then(result => result.json())

