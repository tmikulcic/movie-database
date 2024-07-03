const API_KEY = process.env.MOVIE_API_KEY;
const NEXT_PUBLIC_MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export const fetchTrendingMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.results;
};

export const fetchLatestMovie = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data;
};

export const fetchMovieById = async (id: number) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  return data;
};

export const fetchMovieByIdPublic = async (id: number) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${NEXT_PUBLIC_MOVIE_API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch movie');
  }

  return data;
};

export const fetchFavoriteMovies = async () => {
  const storedIds = localStorage.getItem('favoriteMoviesIds');
  if (!storedIds) {
    return [];
  }

  const favoriteMoviesIds = JSON.parse(storedIds);
  const numericIds = favoriteMoviesIds.map((id: string) => parseInt(id, 10));
  const fetchPromises = numericIds.map((id: number) => fetchMovieByIdPublic(id));

  try {
    const movies = await Promise.all(fetchPromises);
    return movies;
  } catch (error) {
    console.error('Failed to fetch favorite movies:', error);
    throw error;
  }
};

export const fetchLatestMovies = async () => {
  const latestMovie = await fetchLatestMovie();
  const latestMovieId = latestMovie.id;
  const moviePromises = [];
  let skipCounter = 0;

  for (let i = 1; moviePromises.length < 10 && i <= 10; i++) {
    const movieId = latestMovieId - i - skipCounter;
    try {
      const movie = await fetchMovieById(movieId);
      console.log(movie);
      if (movie.adult) {
        skipCounter++;
        i--;
        continue;
      }
      moviePromises.push(movie);
    } catch (error) {
      console.error(`Failed to fetch movie with id ${movieId}:`, error);
    }
  }

  const previousMovies = await Promise.all(moviePromises);

  return previousMovies;
};
