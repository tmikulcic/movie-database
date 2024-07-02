import Image from 'next/image';
import Link from 'next/link';
import { IoStarSharp } from 'react-icons/io5';

const MovieItem = ({ movie }: any) => {
  return (
    <Link className='w-[300px] max-w-[300px]' href={`/movies/${movie.id}`}>
      <Image
        className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title ? movie.title : 'Title missing'}
        width={300}
        height={100}
      />
      <p className='w-[300px] text-2xl text-wrap'>{movie.title || movie.name}</p>
      <div className='flex items-center mt-2'>
        <IoStarSharp size={30} color='#fbbf24' />
        <p className='ml-1 text-xl'>{movie.vote_average ? movie.vote_average.toFixed(1) : 'Not Rated'}</p>
      </div>
    </Link>
  );
};

export default MovieItem;
