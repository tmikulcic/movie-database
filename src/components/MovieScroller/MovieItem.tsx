import Image from 'next/image';
import Link from 'next/link';

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
    </Link>
  );
};

export default MovieItem;
