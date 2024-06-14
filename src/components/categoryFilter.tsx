import { clsx } from 'clsx';

import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  selectCategories,
  selectSelectedCategories,
  updateSelectedCategories,
} from '@/store/movies';

export const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategories = useAppSelector(selectSelectedCategories);

  const handleClickCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      dispatch(
        updateSelectedCategories(
          selectedCategories.filter((cat) => cat !== category)
        )
      );
    } else {
      dispatch(updateSelectedCategories([...selectedCategories, category]));
    }
  };

  return (
    <div className="space-y-3">
      <p className="font-bold text-2xl">Catégories</p>
      <div className="space-x-3">
        {categories.map((category) => (
          <button
            key={category}
            className={clsx('btn btn-outline rounded-full', {
              'btn-primary': selectedCategories.includes(category),
            })}
            onClick={() => handleClickCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
