'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { Movie } from '@/types/types';
import { fetchFavoriteMovies } from '../../lib/api';
import { getYearFromDate } from '@/utils/dateHelper';

import HeaderItem from './HeaderItem';
import SearchBar from './Searchbar';

const Header = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [arrowClicked, setArrowClicked] = useState(false);
  const favoritesRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = () => {
    setFavoritesVisible(!favoritesVisible);
    setArrowClicked(!arrowClicked);
    if (!favoritesVisible) {
      fetchFavorites();
    }
  };

  const fetchFavorites = async () => {
    try {
      const movies = await fetchFavoriteMovies();
      setFavoriteMovies(movies);
    } catch (error) {
      console.error('Failed to fetch favorite movies:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      handleFavoriteClick();
    } else if (event.key === 'ArrowDown') {
      setFavoritesVisible(true);
      setArrowClicked(true);
      fetchFavorites();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent): void => {
    if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
      setFavoritesVisible(false);
      setArrowClicked(false);
    }
  };

  return (
    <header className='flex flex-col lg:flex-row max-w-7xl mx-auto p-4 items-center text-nowrap relative'>
      <h1 className='hidden md:text-xl lg:block lg:text-2xl'>Movie Application</h1>
      <SearchBar />
      <div className='flex mx-auto items-center mt-6 lg:mt-0'>
        <HeaderItem title='Home' url='/' />
        <HeaderItem title='Most Watched' url='/movies' />
        <div ref={favoritesRef} className='relative flex'>
          <HeaderItem title='Favorites' url='/favorites' />
          <div
            className='relative ml-1 md:text-xl lg:text-2xl hover:text-amber-500 cursor-pointer'
            onClick={handleFavoriteClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            ▼
          </div>
          {favoritesVisible && (
            <ul
              className='absolute top-full right-0 mt-1 p-2 bg-white border rounded-lg shadow-lg z-10 md:w-80 lg:w-96'
              style={{ minWidth: '200px' }}
            >
              {favoriteMovies.map((movie, index) => (
                <li
                  key={movie.id}
                  className={`p-2 hover:bg-gray-200 text-lg ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <Link className='text-wrap block' href={`/movies/${movie.id}`} onClick={() => setFavoritesVisible(false)}>
                    <p>{movie.title}</p>
                    <p>({getYearFromDate(movie.release_date)})</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
