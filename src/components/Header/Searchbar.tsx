'use client';

import { type Movie } from '@/types/types';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { HiOutlineSearch } from 'react-icons/hi';
import { getFollowingYear, getYearFromDate } from '@/utils/dateHelper';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
      setHighlightedIndex(-1);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    try {
      const yearRange = getFollowingYear();
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&primary_release_date.lte=${yearRange}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
      const selectedMovie = searchResults[highlightedIndex];
      router.push(`/movies/${selectedMovie.id}`);
    } else {
      router.push(`/search/${searchTerm}`);
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = (): void => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (event.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
        const selectedMovie = searchResults[highlightedIndex];
        router.push(`/movies/${selectedMovie.id}`);
        setSearchResults([]);
      } else {
        handleSubmit(event as any);
      }
    }
  };

  return (
    <div className='relative' ref={searchBarRef}>
      <form className='flex gap-4 mx-8 bg-neutral-100 border rounded-full' onSubmit={handleSubmit}>
        <div className='flex p-1'>
          <input
            className='rounded-full p-2 pl-6 mx-2 w-80 md:w-96'
            type='search'
            id='search'
            value={searchTerm}
            onChange={handleSearch}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder='Search...'
          />
          <button className='p-4 rounded-full bg-yellow-400 hover:bg-yellow-300' type='submit' disabled={!searchTerm}>
            <HiOutlineSearch size={18} />
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <ul className='absolute left-0 right-0 mx-8 mt-2 p-2 bg-white border rounded-lg shadow-lg z-10'>
          {loading && <li>Loading...</li>}
          {searchResults.map((movie, index) => (
            <li
              key={movie.id}
              className={`p-2 hover:bg-gray-200 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Link className='text-wrap' href={`/movies/${movie.id}`} onClick={() => setSearchResults([])}>
                <p>{movie.title}</p>
                <p>({getYearFromDate(movie.release_date)})</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
