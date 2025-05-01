import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/bookService';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSection from '../components/FilterSection';
import { useSearchParams } from 'react-router-dom';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Pagination state
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get page from URL or default to 1
  const page = parseInt(searchParams.get('page')) || 1;
  
  // Initialize filters with default values
  const [filters, setFilters] = useState({
    genres: [],
    priceRange: [0, 100] // Default values until books load
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        setFilteredBooks(data);
        
        if (data.length > 0) {
          const allPrices = data.map(book => book.price);
          const min = Math.floor(Math.min(...allPrices));
          const max = Math.ceil(Math.max(...allPrices));
          setFilters(prev => ({
            ...prev,
            priceRange: [min, max]
          }));
        }
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  useEffect(() => {
    // Sync current page with URL
    setCurrentPage(page);
  }, [page]);

  // Filter books based on filters
  useEffect(() => {
    if (!books || books.length === 0) return;
    
    let filtered = [...books];
    
    // Apply genre filter
    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter(book => filters.genres.includes(book.genre));
    }
    
    // Apply price filter
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(book => book.price >= min && book.price <= max);
    }
    
    setFilteredBooks(filtered);
    setCurrentPage(1); // Reset to first page when filters change
    setSearchParams({ page: 1 }); // Update URL
  }, [filters, books]);

  // Pagination calculations
  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    if (books.length > 0) {
      const allPrices = books.map(book => book.price);
      const min = Math.floor(Math.min(...allPrices));
      const max = Math.ceil(Math.max(...allPrices));
      setFilters({
        genres: [],
        priceRange: [min, max]
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 text-white py-8 min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 text-white py-8 min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-800 text-white py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">All Books</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64">
              <FilterSection
                books={books || []} // Ensure books is always an array
                onFilterChange={handleFilterChange}
                initialFilters={filters}
                resetFilters={resetFilters}
              />
            </div>
            
            {/* Rest of your component remains the same */}
            {/* ... */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BooksPage;