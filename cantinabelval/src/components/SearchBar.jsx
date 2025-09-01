import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Buscar produtos..." }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {value && (
          <button className="clear-button" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;