'use client';

import { type Movie } from '@/types/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import MovieItem from '@/components/MovieScroller/MovieItem';
import { fetchPopularMovies } from '@/lib/api';

const MAX_PAGES = 15;

const MoviesList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const fetchedMovieIds = useRef(new Set());

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore || page > MAX_PAGES) return;

    setLoading(true);
    try {
      const popularMovies = await fetchPopularMovies(page.toString());

      if (Array.isArray(popularMovies.results)) {
        const newMovies: Movie[] = popularMovies.results.filter((movie: Movie) => !fetchedMovieIds.current.has(movie.id));
        newMovies.forEach((movie) => fetchedMovieIds.current.add(movie.id));

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setHasMore(page < popularMovies.total_pages && page < MAX_PAGES);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.log('No more popular movies to fetch:', popularMovies);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useInfiniteScroll(fetchMovies, hasMore, loading);

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
