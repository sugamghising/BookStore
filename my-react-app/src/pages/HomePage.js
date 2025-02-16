import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSection from '../components/FilterSection'; // Import the FilterSection component
import BookGrid from '../components/BookGrid';       // Import the BookGrid component

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedGenres, setCheckedGenres] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [priceRange, setPriceRange] = useState([0, 100]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);

      if (data.length > 0) {
        const allPrices = data.map(book => book.price);
        const min = Math.min(...allPrices);
        const max = Math.max(...allPrices);
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    filterBooks();
  };

  const handleGenreCheckboxChange = (genre) => {
    setCheckedGenres({ ...checkedGenres, [genre]: !checkedGenres[genre] });
    filterBooks();
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
    filterBooks();
  };

  const filterBooks = () => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const selectedGenres = Object.keys(checkedGenres).filter(genre => checkedGenres[genre]);

    if (selectedGenres.length > 0 && !selectedGenres.includes('All')) {
      filtered = filtered.filter(book => selectedGenres.includes(book.genre));
    }

    const [currentMinPrice, currentMaxPrice] = priceRange;
    filtered = filtered.filter(
      (book) => book.price >= currentMinPrice && book.price <= currentMaxPrice
    );

    setFilteredBooks(filtered);
  };

  const uniqueGenres = ['All', ...new Set(books.map((book) => book.genre))];

  const allGenresChecked = Object.values(checkedGenres).every(value => value === true);

  const handleSelectAllGenres = () => {
    if (allGenresChecked) {
      setCheckedGenres({});
    } else {
      const allGenres = {};
      uniqueGenres.slice(1).forEach(genre => allGenres[genre] = true);
      setCheckedGenres(allGenres);
    }
    filterBooks();
  };

  const displayedBooks = filteredBooks.slice(0, 9);

  return (
    <>
      <Header />
      <div className="bg-gray-800 text-white py-8 min-h-screen">
        <div className="container mx-auto px-4 flex">
          <FilterSection
            uniqueGenres={uniqueGenres}
            checkedGenres={checkedGenres}
            handleGenreCheckboxChange={handleGenreCheckboxChange}
            allGenresChecked={allGenresChecked}
            handleSelectAllGenres={handleSelectAllGenres}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            handlePriceRangeChange={handlePriceRangeChange}
            handleSearch={handleSearch}
          />
          <BookGrid displayedBooks={displayedBooks} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;