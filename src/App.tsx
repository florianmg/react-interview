import { CategoryFilter } from './components/categoryFilter';
import { ListMovies } from './components/listMovies';

function App() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-3">
      <div className="space-y-6">
        <CategoryFilter />
        <ListMovies />
      </div>
    </div>
  );
}

export default App;
