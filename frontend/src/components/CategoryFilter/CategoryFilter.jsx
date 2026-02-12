import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: '', label: 'All' },
    { value: 'Photographer', label: 'Photographers' },
    { value: 'Caterer', label: 'Caterers' },
    { value: 'Decorator', label: 'Decorators' },
    { value: 'Venue', label: 'Venues' },
    { value: 'Event Manager', label: 'Event Managers' }
  ];

  return (
    <div className="category-filter">
      <div className="filter-label">Filter by:</div>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category.value}
            className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
