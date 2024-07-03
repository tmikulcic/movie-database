'use client';

import { useState, useEffect, useRef } from 'react';
import HeaderItem from './HeaderItem';
import SearchBar from './Searchbar';
import Link from 'next/link';
import { fetchFavoriteMovies } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/types';

const Header = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [arrowClicked, setArrowClicked] = useState(false); // Track if arrow button is clicked
  const router = useRouter();
  const favoritesRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = () => {
    setFavoritesVisible(!favoritesVisible);
    setArrowClicked(!arrowClicked); // Toggle arrowClicked state
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
      handleFavoriteClick(); // Trigger toggle on Enter key press
    } else if (event.key === 'ArrowDown') {
      setFavoritesVisible(true); // Show favorites on ArrowDown key press
      setArrowClicked(true); // Set arrow clicked to true when arrow key pressed
      fetchFavorites(); // Fetch favorites when arrow is pressed
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
      setArrowClicked(false); // Reset arrow clicked state when clicking outside
    }
  };

  return (
    <header className='flex max-w-6xl mx-auto p-4 items-center text-nowrap relative'>
      <h1 className='md:text-xl lg:text-3xl'>Movie Application</h1>
      <SearchBar />
      <div className='flex ml-auto items-center'>
        <HeaderItem title='Home' url='/' />
        <HeaderItem title='Browse' url='/movies' />
        <div ref={favoritesRef} className='relative flex'>
          <HeaderItem title='Favorites' url='/favorites' />
          <div
            className='relative uppercase mx-2 md:text-xl lg:text-3xl hover:text-amber-500'
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
                    {movie.title}
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
