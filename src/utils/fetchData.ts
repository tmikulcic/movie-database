import { fetchTopRatedMovies, fetchTrendingMovies, fetchLatestMovies } from '../lib/api';

export const getMoviesData = async () => {
  let trendingMovies = [];
  let latestMovies = [];
  let topRatedMovies = [];

  try {
    trendingMovies = await fetchTrendingMovies();
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }

  try {
    topRatedMovies = await fetchTopRatedMovies();
  } catch (error) {
    throw new Error('Failed to fetch top-rated movies');
  }

  try {
    latestMovies = await fetchLatestMovies();
  } catch (error) {
    throw new Error('Failed to fetch latest movies');
  }

  return { trendingMovies, latestMovies, topRatedMovies };
};
