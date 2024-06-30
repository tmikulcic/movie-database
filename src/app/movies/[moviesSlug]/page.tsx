import { fetchMovieById } from '@/lib/api';
import Link from 'next/link';

const MoviePage = async ({ params }: any) => {
  const id = params.moviesSlug;
  let movie = {};

  try {
    movie = await fetchMovieById(id);
  } catch (error) {
    console.error('Failed to fetch requested movie', error);
  }

  return <main>Movie Page</main>;
};

export default MoviePage;
