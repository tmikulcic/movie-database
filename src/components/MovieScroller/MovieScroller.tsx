'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import MovieItem from './MovieItem';
import { useRef } from 'react';

type MovieScrollerProps = {
  title: string;
  movieList: any;
};

const MovieScroller = ({ title, movieList }: MovieScrollerProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 1200;
      if (direction === 'left') {
        sliderRef.current.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        sliderRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  const arrowStyle = 'opacity-50 cursor-pointer hover:opacity-100 hover:rounded-full';
  const arrowSize = 60;

  return (
    <section className='mb-8'>
      <h2 className='my-4 ml-36 text-2xl font-bold w-full'>{title}</h2>
      <div className='relative flex gap-8 items-center'>
        <div className='flex items-center m-4 hover:bg-gray-300  hover:rounded-full'>
          <MdChevronLeft className={arrowStyle} onClick={() => handleScroll('left')} size={arrowSize} />
        </div>
        <div ref={sliderRef} className='flex w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth hide-scrollbar'>
          {movieList.map((movie: any) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <MdChevronRight className={arrowStyle} onClick={() => handleScroll('right')} size={arrowSize} />
      </div>
    </section>
  );
};

export default MovieScroller;
