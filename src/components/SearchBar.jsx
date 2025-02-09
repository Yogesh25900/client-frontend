import React, { useState } from "react";
import { Search } from "lucide-react"; // Import Lucide Search Icon
import "./SearchBar.css"; // Add styles for the search bar

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);  // Call the onSearch function whenever the input changes
  };

  return (
    <div className="search-bar-container">
      {/* Search icon */}
      <Search size={20} color="#888" className="search-icon" />

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}

        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
