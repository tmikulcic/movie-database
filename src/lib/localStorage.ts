'use client';

export const getFavoriteMovies = async () => {
  const storedIds = await localStorage.getItem('favoriteMoviesIds');
  if (!storedIds) {
    return [];
  }

  const favoriteMoviesIds = JSON.parse(storedIds);
  return favoriteMoviesIds;
};
