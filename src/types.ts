export type Movie = {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
  userOpinion?: 'like' | 'dislike';
};
