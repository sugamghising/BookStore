// src/components/common/SearchBar/SearchBar.jsx (or src/components/SearchBar.js)
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => { // Receive onSearch prop
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) { // Call onSearch if it exists
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleChange}
        className="px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none bg-white"
      />
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