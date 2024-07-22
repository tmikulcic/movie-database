import { type Movie } from '@/types/types';

import Link from 'next/link';

import { IoStarSharp } from 'react-icons/io5';
import MovieImage from '../UI/MovieImage';

type MovieItemsProps = {
  movie: Movie;
};

const MovieItem: React.FC<MovieItemsProps> = ({ movie }) => {
  return (
    <Link className='p-2 cursor-pointer hover:scale-105 hover:shadow-lg ease-in-out duration-300' href={`/movies/${movie.id}`}>
      <MovieImage
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title ? movie.title : 'Title missing'}
        width={300}
        height={450}
        clickable={true}
      />

      <div className='flex items-center my-1'>
        <IoStarSharp size={30} color='#fbbf24' />
        <p className='ml-1 text-xl'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'Not Rated'}</p>
      </div>
      <p className='w-[300px] text-2xl overflow-hidden text-wrap '>{movie.title || movie.name}</p>
    </Link>
  );
};

export default MovieItem;
