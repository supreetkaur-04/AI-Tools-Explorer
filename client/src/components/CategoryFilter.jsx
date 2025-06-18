import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div>
      <h3 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-300">Categories</h3>
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;