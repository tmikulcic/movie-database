import { getMoviesData } from '../utils/fetchData';
import MovieScroller from '@/components/MovieScroller/MovieScroller';

const HomePage = async () => {
  const { trendingMovies, latestMovies, topRatedMovies } = await getMoviesData();

  return (
    <main className='flex flex-col mx-auto'>
      <MovieScroller title='Trending Movies' movieList={trendingMovies} />
      <MovieScroller title='Top Rated Movies' movieList={topRatedMovies} />
      <MovieScroller title='Latest Movies' movieList={latestMovies} />
    </main>
  );
};

export default HomePage;
