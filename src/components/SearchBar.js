import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
        name="search"
        id="search"
        placeholder="Search Recipe"
      />
      <div className="radio">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-radio"
          />
          First Letter
        </label>
      </div>
      <button data-testid="exec-search-btn" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
