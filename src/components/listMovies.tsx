import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getMovies, selectMovies, selectMoviesStatus } from '@/store/movies';

export const ListMovies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const moviesStatus = useAppSelector(selectMoviesStatus);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (['loading', 'initial'].includes(moviesStatus)) return <p>Loading...</p>;
  if (moviesStatus === 'failed') return <p>Failed to load movies</p>;
  if (!movies) return <p>No movies found</p>;
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          {movie.title} - {movie.category}
        </li>
      ))}
    </ul>
  );
};
