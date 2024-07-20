'use client';

const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

import { useState, useEffect, useRef, useCallback } from 'react';
import { type Movie } from '@/types/types';
import MovieItem from '@/components/MovieScroller/MovieItem';

const MoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedMovieIds = useRef(new Set());

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();

      if (Array.isArray(data.results)) {
        const newMovies = data.results.filter((movie: any) => !fetchedMovieIds.current.has(movie.id));
        newMovies.forEach((movie: any) => fetchedMovieIds.current.add(movie.id));

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(page < data.total_pages);
      } else {
        console.error('Unexpected response format:', data);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      fetchMovies();
    }
  }, [fetchMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <main className='max-w-8xl mx-auto'>
      <h2 className='my-4 text-center text-3xl'>Most Watched Movies</h2>
      <ul className='flex justify-center gap-4 flex-wrap'>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more movies to load</p>}
    </main>
  );
};

export default MoviesList;
