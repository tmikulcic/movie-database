'use client';

import { type Movie } from '@/types/types';

import { useRef } from 'react';

import MovieItem from './MovieItem';
import ArrowButton from './ArrowButton';

type MovieScrollerProps = {
  title: string;
  movieList: Movie[];
};

const MovieScroller: React.FC<MovieScrollerProps> = ({ title, movieList }) => {
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
      <h2 className='my-4 text-center text-3xl'>{title}</h2>
      <div className='relative flex gap-1 items-center'>
        <div className='hidden lg:block'>
          <ArrowButton direction='left' onClick={() => handleScroll('left')} arrowStyle={arrowStyle} arrowSize={arrowSize} />
        </div>
        <div
          ref={sliderRef}
          className='flex flex-col items-center md:items-start sm:flex-row w-full h-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth hide-scrollbar gap-4'
        >
          {movieList.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </div>
        <div className='hidden lg:block'>
          <ArrowButton direction='right' onClick={() => handleScroll('right')} arrowStyle={arrowStyle} arrowSize={arrowSize} />
        </div>
      </div>
    </section>
  );
};

export default MovieScroller;
