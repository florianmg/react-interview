import { useAppDispatch, useAppSelector } from '@/hooks/useStore';

import {
  selectCurrentPage,
  selectMoviesPerPage,
  setCurrentPage,
  setMoviesPerPage,
} from '@/store/pagination';

export const PaginationController = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const moviesPerPage = useAppSelector(selectMoviesPerPage);

  return (
    <div className="flex items-center gap-x-3">
      {currentPage !== 1 && (
        <button
          className="btn btn-outline"
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          Précédent
        </button>
      )}
      <span>Page {currentPage}</span>
      <button
        className="btn btn-outline"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
      >
        Suivant
      </button>
      <select
        className="select select-bordered"
        value={moviesPerPage}
        onChange={(e) => dispatch(setMoviesPerPage(Number(e.target.value)))}
      >
        {[4, 6, 12].map((option) => (
          <option key={option} value={option}>
            {option} par page
          </option>
        ))}
      </select>
    </div>
  );
};
