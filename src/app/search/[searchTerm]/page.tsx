import MovieItem from '@/components/MovieScroller/MovieItem';

const SearchPage = async ({ params }: any) => {
  const searchTerm = params.searchTerm;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchTerm}&page=1&include_adult=false&language=en-US`
  );

  const data = await res.json();
  const results = data.results;
  console.log(results);

  return (
    <div className='max-w-7xl mx-auto'>
      {results && results.length !== 0 ? (
        <ul className='flex gap-4 flex-wrap'>
          {results.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <h1 className='text-center pt-6'>No results found</h1>
      )}
    </div>
  );
};

export default SearchPage;
