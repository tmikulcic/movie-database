import { fetchTopRatedMovies, fetchTrendingMovies, fetchLatestMovies } from '../lib/api';

export const getMoviesData = async () => {
  let trendingMovies = [];
  let latestMovies = [];
  let topRatedMovies = [];

  try {
    trendingMovies = await fetchTrendingMovies();
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
  }

  try {
    topRatedMovies = await fetchTopRatedMovies();
  } catch (error) {
    console.error('Failed to fetch top-rated movies:', error);
  }

  try {
    latestMovies = await fetchLatestMovies();
  } catch (error) {
    console.error('Failed to fetch latest movies:', error);
  }

  return { trendingMovies, latestMovies, topRatedMovies };
};
