import MovieItem from '@/components/MovieScroller/MovieItem';
import { getFollowingYear } from '@/utils/dateHelper';

const SearchPage = async ({ params }: any) => {
  const searchTerm = params.searchTerm;
  const nextYear = getFollowingYear();

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchTerm}&page=1&include_adult=false&language=en-US&primary_release_date.lte=${nextYear}`
  );

  const data = await res.json();
  const results = data.results;
  console.log(results);

  return (
    <main className='max-w-8xl mx-auto'>
      <h2 className='my-4 text-center text-3xl'>
        Search Results for: <i>&quot;{searchTerm}&quot;</i>
      </h2>
      {results && results.length !== 0 ? (
        <ul className='flex gap-4 flex-wrap justify-center'>
          {results.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <h1 className='text-center pt-6'>No results found</h1>
      )}
    </main>
  );
};

export default SearchPage;
