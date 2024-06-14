import { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '@/utils/createAppSlice';

export const MOVIES_PER_PAGE_OPTIONS = [4, 6, 12];

export interface PaginationSliceState {
  currentPage: number;
  moviesPerPage: number;
}

const initialState: PaginationSliceState = {
  currentPage: 1,
  moviesPerPage: MOVIES_PER_PAGE_OPTIONS[0],
};

export const paginationSlice = createAppSlice({
  name: 'pagination',
  initialState,
  reducers: (create) => ({
    setCurrentPage: create.reducer((state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      return state;
    }),
    setMoviesPerPage: create.reducer((state, action: PayloadAction<number>) => {
      state.moviesPerPage = action.payload;
      return state;
    }),
  }),
  selectors: {
    selectCurrentPage: (state) => state.currentPage,
    selectMoviesPerPage: (state) => state.moviesPerPage,
  },
});

export const { setCurrentPage, setMoviesPerPage } = paginationSlice.actions;

export const { selectCurrentPage, selectMoviesPerPage } =
  paginationSlice.selectors;
