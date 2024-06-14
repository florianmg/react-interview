import React from 'react';

import { Movie } from '@/types';

type CardMovieProps = {
  movie: Movie;
};
// Add black semi transparent overlay to the card
export const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  return (
    <div className="w-72 h-96 bg-cover bg-center relative rounded-xl overflow-hidden border-2 border-base-content">
      <div
        className="w-full h-full absolute top-0 left-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(/posters/${movie.id}.webp)`,
        }}
      />
      <div className="absolute z-10 w-full bottom-0 p-3">
        <div className="z-30 relative flex items-center justify-between">
          <p className="font-bold text-xl text-white">{movie.title}</p>
          <p className="badge">{movie.category}</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-black" />
      </div>
    </div>
  );
};
