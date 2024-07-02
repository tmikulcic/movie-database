import Image from 'next/image';
import { fetchMovieById } from '@/lib/api';
import { getYearFromDate } from '@/utils/dateHelper';
import { IoStarSharp } from 'react-icons/io5';
import FavoriteButton from '@/components/MovieDetailsPage/FavoriteButton';
import { Movie } from '@/types/types';

const MoviePage = async ({ params }: any) => {
  const id = params.moviesSlug;
  let movie: any = {};

  try {
    movie = await fetchMovieById(id);
  } catch (error) {
    console.error('Failed to fetch requested movie', error);
  }

  return (
    <main className='flex flex-col items-center justify-center'>
      <div className='relative flex justify-center md:flex-row shadow-xl rounded-xl bg-neutral-100 m-16'>
        <Image
          className='inline-block rounded-tl-xl rounded-bl-xl'
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title ? movie.title : 'Title missing'}
          width={400}
          height={1200}
        />
        <div className='relative m-8 w-[700px]'>
          <div>
            <span className='text-3xl font-bold text-wrap'>{movie.title}</span>
            <span className='text-2xl ml-1'>({getYearFromDate(movie.release_date)})</span>
          </div>
          <div className='flex items-center mt-2'>
            <IoStarSharp size={30} color='#fbbf24' />
            <p className='ml-1 text-xl'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'Not Rated'}</p>
          </div>
          <h2 className='mt-4 mb-2 text-2xl font-bold'>Overview:</h2>
          <p className='text-lg'>{movie.overview}</p>
          <FavoriteButton movieId={id} />
        </div>
      </div>
    </main>
  );
};

export default MoviePage;
