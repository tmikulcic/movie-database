import { fetchLatestMovies, fetchMovies } from '@/lib/api';
import MovieScroller from '@/components/MovieScroller/MovieScroller';

const HomePage = async () => {
  const trendingMovies = await fetchMovies('trending');
  const topRatedMovies = await fetchMovies('top rated');
  const latestMovies = await fetchLatestMovies();

  return (
    <main className='flex flex-col mx-auto'>
      <MovieScroller title='Trending Movies' movieList={trendingMovies} />
      <MovieScroller title='Top Rated Movies' movieList={topRatedMovies} />
      <MovieScroller title='Latest Movies' movieList={latestMovies} />
    </main>
  );
};

export default HomePage;
