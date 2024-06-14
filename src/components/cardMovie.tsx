import React from 'react';
import { clsx } from 'clsx';
import { useAppDispatch } from '@/hooks/useStore';
import { deleteMovie, likeMovie, dislikeMovie } from '@/store/movies';

import { Movie } from '@/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

type CardMovieProps = {
  movie: Movie;
};

export const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const onDeleteMovie = () => {
    dispatch(deleteMovie(movie.id));
  };
  const onLikeMovie = () => {
    dispatch(likeMovie(movie.id));
  };
  const onDislikeMovie = () => {
    dispatch(dislikeMovie(movie.id));
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
          <div className="join join-vertical lg:join-horizontal">
            <button
              className={clsx('btn btn-sm join-item', {
                'btn-success': movie.userOpinion === 'like',
              })}
              onClick={onLikeMovie}
            >
              {movie.likes}
              <ThumbsUp size={16} />
            </button>
            <button
              className={clsx('btn btn-sm join-item', {
                'btn-error': movie.userOpinion === 'dislike',
              })}
              onClick={onDislikeMovie}
            >
              {movie.dislikes} <ThumbsDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
