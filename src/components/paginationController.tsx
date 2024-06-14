import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/useStore';

import {
  selectCurrentPage,
  selectMoviesPerPage,
  setCurrentPage,
  setMoviesPerPage,
  MOVIES_PER_PAGE_OPTIONS,
} from '@/store/pagination';
import { selectSelectedCategories, selectMovies } from '@/store/movies';

export const PaginationController = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const moviesPerPage = useAppSelector(selectMoviesPerPage);
  const movies = useAppSelector(selectMovies);
  const selectedCategories = useAppSelector(selectSelectedCategories);

  const maxPages = useMemo(() => {
    const filteredMovies =
      selectedCategories.length > 0
        ? movies.filter((movie) => selectedCategories.includes(movie.category))
        : movies;

    return Math.ceil(filteredMovies.length / moviesPerPage);
  }, [movies, moviesPerPage, selectedCategories]);

  const onClickNext = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const onClickPrevious = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const onSelectQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    dispatch(setMoviesPerPage(value));
  };

  useEffect(() => {
    if (currentPage > maxPages) {
      dispatch(setCurrentPage(1));
    }
  }, [currentPage, maxPages, dispatch]);

  return (
    <div className="flex items-center gap-x-3">
      {maxPages > 1 && (
        <div className="space-x-3">
          {currentPage !== 1 && (
            <button className="btn btn-outline" onClick={onClickPrevious}>
              Précédent
            </button>
          )}
          <span>Page {currentPage}</span>
          {currentPage < maxPages && (
            <button className="btn btn-outline" onClick={onClickNext}>
              Suivant
            </button>
          )}
        </div>
      )}
      <select
        className="select select-bordered"
        value={moviesPerPage}
        onChange={onSelectQuantity}
      >
        {MOVIES_PER_PAGE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option} par page
          </option>
        ))}
      </select>
    </div>
  );
};
