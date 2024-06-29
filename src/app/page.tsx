import { fetchLatestMovies, fetchTopRatedMovies, fetchTrendingMovies } from '../lib/api';

const HomePage = async () => {
  let trendingMovies = [];
  let latestMovie = null;
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
    latestMovie = await fetchLatestMovies();
  } catch (error) {
    console.error('Failed to fetch latest movie:', error);
  }

  // console.log('Trending Movies:', trendingMovies);
  console.log('Latest Movie:', latestMovie);

  return (
    <main className='flex flex-col mx-auto'>
      <section className='ml-24'>
        <h2>Trending Movies</h2>
        <ul className='flex gap-16 snap-x'>
          {trendingMovies.map((movie: any) => (
            <li key={movie.id}>{movie.title || movie.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Top Rated Movies</h2>
        <ul>
          {topRatedMovies.map((movie: any) => (
            <li key={movie.id}>{movie.title || movie.name}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Latest Movie</h2>
        {latestMovie && <p>{latestMovie.title || latestMovie.name}</p>}
      </section>
    </main>
  );
};

export default HomePage;
