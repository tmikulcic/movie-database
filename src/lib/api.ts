const API_KEY = process.env.MOVIE_API_KEY;
const NEXT_PUBLIC_MOVIE_API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

const fetchData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return data;
};

export const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results;
};

export const fetchTopRatedMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
  const data = await fetchData(url);
  return data.results;
};

export const fetchLatestMovie = async () => {
  const url = `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchMovieById = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  return await fetchData(url);
};

export const fetchMovieByIdPublic = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${NEXT_PUBLIC_MOVIE_API_KEY}`;
  return await fetchData(url);
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
    throw new Error('Failed to fetch favorite movies');
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
      if (movie.adult || movie.poster_path === null) {
        skipCounter++;
        i--;
        continue;
      }
      moviePromises.push(movie);
    } catch (error) {
      console.error(`Failed to fetch movie with id ${movieId}:`, error);
    }
  }

  return await Promise.all(moviePromises);
};
