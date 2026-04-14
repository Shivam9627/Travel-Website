import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search destinations, countries…' }) => {
  return (
    <div className="search-bar">
      <label className="search-bar__label visually-hidden" htmlFor="site-search">
        Search
      </label>
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-bar__input"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
