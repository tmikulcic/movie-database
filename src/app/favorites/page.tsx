'use client';

import { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<string[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteMoviesIds = () => {
      const storedIds = localStorage.getItem('favoriteMoviesIds');
      console.log(storedIds);
      if (storedIds) {
        const parsedIds = JSON.parse(storedIds);
        console.log(parsedIds);
        setFavoriteMoviesIds(parsedIds);
      }
    };

    fetchFavoriteMoviesIds();
  }, []);

  return (
    <main className='max-w-6xl mx-auto'>
      <h1>Favorites Page</h1>
      <ul>
        {favoriteMoviesIds.map((id, index) => (
          <li key={index}>{id}</li>
          // <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </main>
  );
};

export default FavoritesPage;
