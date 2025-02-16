// FilterSection.js (Component for Genre and Price Filters)
import React from 'react';

const FilterSection = ({ 
  uniqueGenres, 
  checkedGenres, 
  handleGenreCheckboxChange, 
  allGenresChecked, 
  handleSelectAllGenres, 
  minPrice, 
  maxPrice, 
  priceRange, 
  handlePriceRangeChange,
  handleSearch
}) => {
  return (
    <div className="w-1/4 pr-4">
      <h2 className="text-xl font-bold mb-4">Filter by Genre</h2>
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={allGenresChecked}
              onChange={handleSelectAllGenres}
            />
            <span className="ml-2">Select All</span>
          </label>
        </div>
        <ul className="space-y-2">
          {uniqueGenres.slice(1).map((genre) => (
            <li key={genre}>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={checkedGenres[genre] || false}
                  onChange={() => handleGenreCheckboxChange(genre)}
              />
                <span className="ml-2">{genre}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="text-xl font-bold mb-4 mt-4">Filter by Price</h2>
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="mt-4">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange[1]}
            onChange={(event, newValue) => handlePriceRangeChange(event, [priceRange[0], newValue])}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      {/* <SearchBar onSearch={handleSearch} /> */}
    </div>
  );
};

export default FilterSection;



