import React from 'react';

import { useAppDispatch } from '@/hooks/useStore';
import { deleteMovie } from '@/store/movies';

import { Movie } from '@/types';

type CardMovieProps = {
  movie: Movie;
};
// Add black semi transparent overlay to the card
export const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const onDeleteMovie = () => {
    dispatch(deleteMovie(movie.id));
  };
  return (
    <div className="w-72 h-96 bg-cover bg-center relative rounded-xl overflow-hidden border-2 border-base-content">
      <div
        className="w-full h-full absolute top-0 left-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(/posters/${movie.id}.webp)`,
        }}
      />
      <div className="absolute z-10 w-full bottom-0 p-3 bg-black space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl text-white">{movie.title}</p>
          <p className="badge">{movie.category}</p>
        </div>

        <div className="flex items-center justify-between">
          <button className="btn btn-sm" onClick={onDeleteMovie}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};
