'use client';

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="filter-pills" role="list" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="listitem"
          className={`pill${activeCategory === cat.id ? ' active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
          aria-pressed={activeCategory === cat.id}
          aria-label={`Filter by ${cat.label}`}
        >
          {cat.icon && <span aria-hidden="true">{cat.icon}</span>}
          {cat.label}
        </button>
      ))}
    </div>
  );
}
