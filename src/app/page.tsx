import MovieItem from '@/components/movieItem';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchLatestMovies } from '../lib/api';

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

  //console.log('Trending Movies:', trendingMovies);
  console.log('Latest Movies:', latestMovies);

  return (
    <main className='flex flex-col mx-auto'>
      <section className='ml-24 mb-8'>
        <h2 className='text-2xl font-bold my-4'>Trending Movies</h2>
        <div className='flex gap-8 '>
          {trendingMovies.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <section className='ml-24 mb-8'>
        <h2 className='text-2xl font-bold my-4'>Top Rated Movies</h2>
        <div className='flex gap-8 '>
          {topRatedMovies.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      <section className='ml-24 mb-8'>
        <h2 className='text-2xl font-bold my-4'>Latest Movie</h2>
        <div className='flex gap-8'>
          {latestMovies.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
