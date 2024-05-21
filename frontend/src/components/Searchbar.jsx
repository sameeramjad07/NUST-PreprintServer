import React, { useState } from 'react';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('keyword');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search with searchQuery and selectedCategory
    console.log('Search Query:', searchQuery);
    console.log('Selected Category:', selectedCategory);
    // Add your search functionality here
  };

  return (
    <form className="relative max-w-lg mx-auto" onSubmit={handleSearch}>
      <div className="flex items-center">
        <div className="relative flex-grow flex">
          <input
            type="search"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full py-2 px-4 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-l focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Search for papers, articles, etc."
            required
          />
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className=" inset-y-0 right-0 flex items-center justify-center px-2 py-1 w-auto bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
                {selectedCategory}
                <svg
                className={`w-4 h-4 transition-transform duration-300 transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 12.586l-3.293-3.293-1.414 1.414L10 15.414l4.707-4.707-1.414-1.414L10 12.586z"
                />
                </svg>
            </button>
        </div>


        <button
          type="submit"
          className="flex-shrink-0 px-4 py-2 ml-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      <div className={`absolute top-full right-20 w-1/3 ${isDropdownOpen ? '' : 'hidden'}`}>
        <div className="py-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <button
            type="button"
            onClick={() => handleCategorySelect('keyword')}
            className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
          >
            Keyword
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect('title')}
            className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
          >
            Title
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect('author')}
            className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
          >
            Author
          </button>
          <button
            type="button"
            onClick={() => handleCategorySelect('abstract')}
            className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
          >
            Abstract
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchComponent;
