import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getMovies, selectMovies, selectMoviesStatus } from '@/store/movies';
import { CardMovie } from './cardMovie';

export const ListMovies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const moviesStatus = useAppSelector(selectMoviesStatus);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (['loading', 'initial'].includes(moviesStatus))
    return <p>Chargement des films...</p>;
  if (moviesStatus === 'failed') return <p>Un erreur est</p>;
  if (movies.length === 0) return <p>Aucun film de trouvé</p>;
  return (
    <div className="space-y-3">
      <p className="font-extrabold text-7xl">NOS FILMS</p>
      <div className="flex flex-wrap gap-6">
        {movies.map((movie) => (
          <CardMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
