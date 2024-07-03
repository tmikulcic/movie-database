'use client';

import { useEffect, useState } from 'react';
import { fetchFavoriteMovies } from '../../lib/api';
import MovieItem from '@/components/MovieScroller/MovieItem';

const FavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const movies = await fetchFavoriteMovies();
        setFavoriteMovies(movies);
      } catch (error) {
        console.error('Failed to fetch favorite movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (isLoading) {
    return <div className='text-center mt-64 text-3xl'>Loading favorites...</div>;
  }

  return (
    <main className='max-w-7xl mx-auto'>
      <h2 className='my-4 text-2xl font-bold'>Favorite Movies</h2>
      <ul className='flex gap-4 flex-wrap'>
        {favoriteMovies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </main>
  );
};

export default FavoritesPage;
