import nock from 'nock'
import {
    API_BASE_URL,
    API_KEY,
    SEARCH_MOVIES_PATH,
    GET_POPULAR_MOVIES_PATH,
    FETCH_MOVIE_DETAIL,
    searchMovies,
    fetchMovieDetail,
    fetchPopularMovies,
    PopularMoviesRequestResult,
    MovieRequestResult
} from './movies'

afterEach(nock.cleanAll);
afterAll(nock.restore);

const nockBase = () => nock(API_BASE_URL)
    .defaultReplyHeaders({
        'Access-Control-Allow-Origin': '*',
    })

export const mockSearchMovies = (text: string, result: PopularMoviesRequestResult) => {
    return nockBase()
        .get(`${SEARCH_MOVIES_PATH}?api_key=${API_KEY}&query=${encodeURI(text)}`)
        .reply(200, result)
}

export const mockFetchPopularMovies = (result: PopularMoviesRequestResult) => {
    return nockBase()
        .get(`${GET_POPULAR_MOVIES_PATH}?api_key=${API_KEY}`)
        .reply(200, result)
}

export const mockFetchMovieDetail = (id: number, result: MovieRequestResult) => {
    return nockBase()
        .get(`${FETCH_MOVIE_DETAIL}${id}?api_key=${API_KEY}`)
        .reply(200, result)
}

describe('[SERVICE] movie', () => {
    it('searchMovies should call the good API', async () => {
        const text = 'hey';
        const resultData = {
            page: 0,
            total_pages: 2,
            total_results: 4,
            results: [
                {
                    id: 1,
                    original_title: "test 1",
                    overview: "this is a test",
                    vote_average: "7.5",
                    poster_path: '/this/path'
                },
                {
                    id: 2,
                    original_title: "test 2",
                    overview: "this is a test 2",
                    vote_average: "7.5",
                    poster_path: '/this/path'
                }
            ]
        }

        mockSearchMovies(text, resultData)
        
        const result = await searchMovies(text)
        expect(result).toEqual(resultData)
    })

    it('fetchPopularMovies should call the good API', async () => {
        const resultData = {
            page: 0,
            total_pages: 2,
            total_results: 4,
            results: [
                {
                    id: 1,
                    original_title: "test 1",
                    overview: "this is a test",
                    vote_average: "7.5",
                    poster_path: '/this/path'
                },
                {
                    id: 2,
                    original_title: "test 2",
                    overview: "this is a test 2",
                    vote_average: "7.5",
                    poster_path: '/this/path'
                }
            ]
        }

        mockFetchPopularMovies(resultData)
        
        const result = await fetchPopularMovies()
        expect(result).toEqual(resultData)
    })

    it('fetchMovieDetail should call the good API', async () => {
        const id = 2
        const resultData = {
            id,
            original_title: 'test',
            overview: 'this is a test',
            vote_average: '3.5',
            poster_path: '/test.png'
        }

        mockFetchMovieDetail(id, resultData)
        
        const result = await fetchMovieDetail(id)
        expect(result).toEqual(resultData)
    })
})