import { CategoryFilter } from '@/components/categoryFilter';
import { ListMovies } from '@/components/listMovies';
import { PaginationController } from '@/components/paginationController';

function App() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-3">
      <div className="space-y-6">
        <div className="flex flex-col gap-y-3 justify-center items md:flex-row md:items-end md:justify-between">
          <CategoryFilter />
          <PaginationController />
        </div>
        <ListMovies />
        <div className="flex justify-end">
          <PaginationController />
        </div>
      </div>
    </div>
  );
}

export default App;
