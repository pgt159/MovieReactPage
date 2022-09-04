export const fetcher = (...args) => fetch(...args).then(res => res.json());

const endpointMovie = 'https://api.themoviedb.org/3/movie';
const searchEndpoint = 'https://api.themoviedb.org/3/search/movie?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US'
const apiKey = '68ff44b16c8cfc514f5219295b422d75';

const endpointSeries = 'https://api.themoviedb.org/3/tv';
const seriesSearchEndpoint = 'https://api.themoviedb.org/3/search/tv?api_key=68ff44b16c8cfc514f5219295b422d75&language=en-US'
export const tmdb = {
    getMovieList: (type,page = 1) => `${endpointMovie}/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
    getMovieDetails: (id, detail) => `${endpointMovie}/${id}${detail ? `/${detail}` : ""}?api_key=${apiKey}&language=en-US`,
    getMovieSearchPage: (query, page = 1) => `${searchEndpoint}&query=${query}&page=${page}`,
    getTypeGenre: (type = 'movie') => `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`,
    getMovieGenreList: (genre,page) => `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`
}

export const tmdbSeries = {
    getSeriesList: (type,page = 1) => `${endpointSeries}/${type}?api_key=${apiKey}&language=en-US&page=${page}`,
    getSeriesDetails: (id, detail) => `${endpointSeries}/${id}${detail ? `/${detail}` : ""}?api_key=${apiKey}&language=en-US`,
    getSeriesSearchPage: (query, page = 1) => `${seriesSearchEndpoint}&query=${query}&page=${page}`,
    getSeriesGenreList: (genre,page = 1) => `http://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre}&page=${page}`
}

export const flexible = {
    getDetails: (type, id) => `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US`
}