const API_KEY = '8b74585b34628152a3fa07600dea420d';
const API_BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = () =>
  fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`).then(result => result.json())