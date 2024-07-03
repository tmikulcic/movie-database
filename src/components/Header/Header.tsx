'use client';

import { useState, useEffect, useRef } from 'react';
import HeaderItem from './HeaderItem';
import SearchBar from './Searchbar';
import Link from 'next/link';
import { fetchFavoriteMovies } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/types';
import { getYearFromDate } from '@/utils/dateHelper';

const Header = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [arrowClicked, setArrowClicked] = useState(false);
  const router = useRouter();
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
    <header className='flex max-w-6xl mx-auto p-4 items-center text-nowrap relative'>
      <h1 className='md:text-xl lg:text-3xl'>Movie Application</h1>
      <SearchBar />
      <div className='flex ml-auto items-center'>
        <HeaderItem title='Home' url='/' />
        <HeaderItem title='Most Watched' url='/movies' />
        <div ref={favoritesRef} className='relative flex'>
          <HeaderItem title='Favorites' url='/favorites' />
          <div
            className='relative ml-1 md:text-xl lg:text-3xl hover:text-amber-500 cursor-pointer'
            onClick={handleFavoriteClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            ▼
          </div>
          {favoritesVisible && (
            <ul className='absolute left-0 right-0 mt-8 p-2 bg-white border rounded-lg shadow-lg z-10' style={{ minWidth: '200px' }}>
              {favoriteMovies.map((movie, index) => (
                <li
                  key={movie.id}
                  className={`p-2 hover:bg-gray-200 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
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
