const API_KEY = process.env.MOVIE_API_KEY;

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

export const fetchLatestMovies = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data;
};
