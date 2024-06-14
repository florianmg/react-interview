import { PayloadAction, createSelector } from '@reduxjs/toolkit';

import { createAppSlice } from '@/utils/createAppSlice';

import { movies$ } from '@/data/movies';
import { Movie } from '@/types';

export interface MoviesSliceState {
  movies: Movie[];
  likedMovies: string[];
  dislikesMovies: string[];
  status: 'initial' | 'idle' | 'loading' | 'failed';
}

const initialState: MoviesSliceState = {
  movies: [],
  likedMovies: [],
  dislikesMovies: [],
  status: 'initial',
};

const fetchMovies = () => movies$;

export const moviesSlice = createAppSlice({
  name: 'movies',
  initialState,
  reducers: (create) => ({
    getMovies: create.asyncThunk(
      async () => {
        const response = await fetchMovies();
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.movies = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      }
    ),
    deleteMovie: create.reducer((state, action: PayloadAction<string>) => {
      if (!state.movies) return state;
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
      return state;
    }),
    likeMovie: create.reducer((state, action: PayloadAction<string>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.id === action.payload) {
          if (movie.userOpinion === 'like') {
            movie.likes--;
            movie.userOpinion = undefined;
          } else if (movie.userOpinion === 'dislike') {
            movie.likes++;
            movie.dislikes--;
            movie.userOpinion = 'like';
          } else {
            movie.likes++;
            movie.userOpinion = 'like';
          }
        }
        return movie;
      });
    }),
    dislikeMovie: create.reducer((state, action: PayloadAction<string>) => {
      state.movies = state.movies.map((movie) => {
        if (movie.id === action.payload) {
          if (movie.userOpinion === 'dislike') {
            movie.dislikes--;
            movie.userOpinion = undefined;
          } else if (movie.userOpinion === 'like') {
            movie.dislikes++;
            movie.likes--;
            movie.userOpinion = 'dislike';
          } else {
            movie.dislikes++;
            movie.userOpinion = 'dislike';
          }
        }
        return movie;
      });
    }),
    filterMoviesByCategory: create.reducer(
      (state, action: PayloadAction<string>) => {
        if (!state.movies) return state;
        state.movies = state.movies.filter(
          (movie) => movie.category === action.payload
        );
        return state;
      }
    ),
  }),
  selectors: {
    selectMovies: (state) => state.movies,
    selectMoviesStatus: (state) => state.status,
    selectCategories: createSelector(
      [(state: MoviesSliceState) => state.movies],
      (movies) => {
        if (!movies) return [];
        return Array.from(new Set(movies.map((movie) => movie.category)));
      }
    ),
  },
});

export const { getMovies, deleteMovie, dislikeMovie, likeMovie } =
  moviesSlice.actions;
export const { selectMovies, selectMoviesStatus, selectCategories } =
  moviesSlice.selectors;
