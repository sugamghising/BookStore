import React, { useState } from 'react';

const SearchBar = ({ onSearch, searchTerm, onClear }) => {
  const [query, setQuery] = useState(searchTerm || '');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    // Optional: Add live search by calling onSearch here
    // onSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (onClear) onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full max-w-2xl mx-auto">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search books by title, author, or genre..."
          value={query}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none bg-white"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded-r-lg hover:bg-blue-600 text-white"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;