import { fetchTopRatedMovies, fetchTrendingMovies, fetchLatestMovies } from '../lib/api';
import MovieScroller from '@/components/MovieScroller/MovieScroller';

const HomePage = async () => {
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
    console.error('Failed to fetch trending movies:', error);
  }

  try {
    latestMovies = await fetchLatestMovies();
  } catch (error) {
    console.error('Failed to fetch latest movies:', error);
  }

  console.log('Trending Movies:', trendingMovies);
  // console.log('Latest Movies:', latestMovies);

  return (
    <main className='flex flex-col mx-auto'>
      <MovieScroller title='Trending Movies' movieList={trendingMovies} />
      <MovieScroller title='Top Rated Movies' movieList={topRatedMovies} />
      <MovieScroller title='Latest Movies' movieList={latestMovies} />
    </main>
  );
};

export default HomePage;
