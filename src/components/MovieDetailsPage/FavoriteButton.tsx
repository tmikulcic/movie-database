'use client';

import { useEffect, useState } from 'react';

type FavoriteButtonProps = {
  movieId: number;
};

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    // Check if the current movieId is favorited
    const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds') || '[]');
    setIsFavorite(favoriteMovieIds.includes(movieId));
  }, [movieId]);

  const handleFavorite = (): void => {
    // Retrieve favorite movie IDs from localStorage
    const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovieIds') || '[]');

    // Toggle favorite state
    if (isFavorite) {
      // Remove movieId from favoriteMovieIds
      const updatedFavoriteIds = favoriteMovieIds.filter((id: number) => id !== movieId);
      localStorage.setItem('favoriteMovieIds', JSON.stringify(updatedFavoriteIds));
      setIsFavorite(false);
      console.log('Removed from favorites');
    } else {
      // Add movieId to favoriteMovieIds
      const updatedFavoriteIds = [...favoriteMovieIds, movieId];
      localStorage.setItem('favoriteMovieIds', JSON.stringify(updatedFavoriteIds));
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
