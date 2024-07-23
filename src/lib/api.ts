import { type Movie } from '@/types/types';

const API_KEY = process.env.MOVIE_API_KEY;
const NEXT_PUBLIC_MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchData = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return res.json();
};

export const fetchMovies = async (type: 'trending' | 'top rated'): Promise<Movie[]> => {
  let endpoint: string;

  switch (type) {
    case 'trending':
      endpoint = '/trending/all/week';
      break;
    case 'top rated':
      endpoint = '/movie/top_rated';
      break;
    default:
      throw new Error('Invalid movie request');
  }

  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
  const data = await fetchData(url);

  return data.results;
};

export const fetchLatestMovie = async (): Promise<Movie> => {
  const url = `${BASE_URL}/movie/latest?api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchMovieById = async (id: number): Promise<Movie> => {
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchMovieByIdPublic = async (id: number): Promise<Movie> => {
  const url = `${BASE_URL}/movie/${id}?api_key=${NEXT_PUBLIC_MOVIE_API_KEY}`;
  return await fetchData(url);
};

export const fetchFavoriteMovies = async (): Promise<Movie[]> => {
  const storedIds = localStorage.getItem('favoriteMoviesIds');
  if (!storedIds) {
    return [];
  }

  const favoriteMoviesIds = JSON.parse(storedIds);
  const numericIds = favoriteMoviesIds.map((id: string) => parseInt(id, 10));
  const fetchPromises = numericIds.map((id: number) => fetchMovieByIdPublic(id));

  try {
    const movies = await Promise.all(fetchPromises);
    return movies;
  } catch (error) {
    console.error('Failed to fetch favorite movies:', error);
    throw new Error('Failed to fetch favorite movies');
  }
};

export const fetchLatestMovies = async (): Promise<Movie[]> => {
  const latestMovie = await fetchLatestMovie();
  const latestMovieId = latestMovie.id;
  const moviePromises: Promise<Movie>[] = [];
  let skipCounter = 0;

  for (let i = 1; moviePromises.length < 20 && i <= 20; i++) {
    const movieId = latestMovieId - i - skipCounter;
    try {
      const movie = await fetchMovieById(movieId);
      if (movie.adult || movie.poster_path === null) {
        skipCounter++;
        i--;
        continue;
      }
      moviePromises.push(Promise.resolve(movie));
    } catch (error) {
      console.error(`Failed to fetch movie with id ${movieId}:`, error);
    }
  }

  return await Promise.all(moviePromises);
};

export const fetchPopularMovies = async (page: string) => {
  const url = `${BASE_URL}/movie/popular?api_key=${NEXT_PUBLIC_MOVIE_API_KEY}&page=${page}`;
  return await fetchData(url);
};
