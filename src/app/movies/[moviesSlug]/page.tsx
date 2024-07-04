import Image from 'next/image';
import { fetchMovieById } from '@/lib/api';
import { getYearFromDate } from '@/utils/dateHelper';
import { IoStarSharp } from 'react-icons/io5';
import FavoriteButton from '@/components/MovieDetailsPage/FavoriteButton';
import { Movie } from '@/types/types';
import MovieImage from '@/components/UI/MovieImage';

const MoviePage = async ({ params }: any) => {
  const id = params.moviesSlug;
  let movie: any = {};

  try {
    movie = (await fetchMovieById(id)) as Movie;
  } catch (error) {
    throw new Error('Failed to fetch requested movie');
  }

  return (
    <main className='flex flex-col items-center justify-center'>
      <div className='flex justify-center md:flex-row lg:shadow-xl lg:rounded-xl lg:bg-neutral-100 m-4 md:mx-8 lg:mx-72'>
        <div className='hidden lg:block w-[700px]'>
          <MovieImage
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.title ? movie.title : 'Title missing'}
            width={400}
            height={600}
            clickable={false}
          />
        </div>
        <div className='m-8'>
          <span className='text-3xl font-bold text-wrap'>{movie?.title}</span>
          <span className='text-2xl ml-1 mr-4'>({getYearFromDate(movie.release_date)})</span>
          <FavoriteButton movieId={id} />
          <div>
            {movie?.genres && movie.genres.length > 0 && (
              <div className='mt-1'>
                <span className='inline-block text-lg text-gray-700'>{movie.genres.map((genre: any) => genre.name).join(', ')}</span>
              </div>
            )}
            <div className='flex items-center mt-2'>
              <IoStarSharp size={30} color='#fbbf24' />
              <p className='ml-1 text-xl'>{movie?.vote_average ? movie?.vote_average.toFixed(1) : 'Not Rated'}</p>
            </div>
          </div>
          <h2 className='mt-4 mb-2 text-2xl '>Overview:</h2>
          <p className='text-lg'>{movie?.overview ? movie.overview : 'No Overview yet'}</p>
        </div>
      </div>
    </main>
  );
};

export default MoviePage;
