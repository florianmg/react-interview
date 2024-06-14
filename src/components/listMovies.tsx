import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  getMovies,
  selectMovies,
  selectMoviesStatus,
  selectSelectedCategories,
} from '@/store/movies';
import { selectCurrentPage, selectMoviesPerPage } from '@/store/pagination';
import { CardMovie } from './cardMovie';

export const ListMovies = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const moviesStatus = useAppSelector(selectMoviesStatus);
  const selectedCategories = useAppSelector(selectSelectedCategories);
  const currentPage = useAppSelector(selectCurrentPage);
  const moviesPerPage = useAppSelector(selectMoviesPerPage);
  const filteredMovies = useMemo(() => {
    return selectedCategories.length > 0
      ? movies
          .filter((movie) => selectedCategories.includes(movie.category))
          .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
      : movies.slice(
          (currentPage - 1) * moviesPerPage,
          currentPage * moviesPerPage
        );
  }, [movies, selectedCategories, currentPage, moviesPerPage]);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  if (['loading', 'initial'].includes(moviesStatus))
    return <p>Chargement des films...</p>;
  if (moviesStatus === 'failed') return <p>Un erreur est</p>;
  if (movies.length === 0) return <p>Aucun film de trouvé</p>;
  return (
    <div className="flex flex-wrap gap-6">
      {filteredMovies.map((movie) => (
        <CardMovie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
