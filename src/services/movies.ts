const API_KEY = '8b74585b34628152a3fa07600dea420d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

export interface MovieRequestResult {
  original_title: string
  overview: string
  vote_average: string
  poster_path: string;
}

export interface PopularMoviesRequestResult {
  page: number
  total_pages: number
  total_results: number
  results: MovieRequestResult[]
}

export const fetchPopularMovies = (): Promise<PopularMoviesRequestResult> =>
  fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`).then(result => result.json())