'use client';

import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to the parent
  };

  return (
    <div className="flex justify-center mt-24 p-4">
      <input
        type="text"
        placeholder="Search todos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-l-md w-64 text-black"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
