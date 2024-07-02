'use client';

import { useEffect, useState } from 'react';

type FavoriteButtonProps = {
  movieId: number;
};

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current movieId is favorited
    const favoriteMoviesIds = JSON.parse(localStorage.getItem('favoriteMoviesIds') || '[]');
    setIsFavorite(favoriteMoviesIds.includes(movieId));
  }, [movieId]);

  const handleFavorite = (): void => {
    const favoriteMoviesIds = JSON.parse(localStorage.getItem('favoriteMoviesIds') || '[]');

    if (isFavorite) {
      // Remove movieId from favoriteMoviesIds
      const updatedFavoriteIds = favoriteMoviesIds.filter((id: number) => id !== movieId);
      localStorage.setItem('favoriteMoviesIds', JSON.stringify(updatedFavoriteIds));
      setIsFavorite(false);
      console.log('Removed from favorites');
    } else {
      // Add movieId to favoriteMoviesIds
      const updatedFavoriteIds = [...favoriteMoviesIds, movieId];
      localStorage.setItem('favoriteMoviesIds', JSON.stringify(updatedFavoriteIds));
      setIsFavorite(true);
      console.log('Added to favorites');
    }
  };

  return (
    <button className='absolute bottom-4 right-4 bg-yellow-500 p-4 rounded-xl text-neutral-50' onClick={handleFavorite}>
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
