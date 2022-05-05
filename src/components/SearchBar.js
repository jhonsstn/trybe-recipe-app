import React, { useState, useContext } from 'react';
import { Context } from '../context/AppContext';
import { fetchData } from '../services/apiHelper';

function SearchBar() {
  const { setMeals, setDrinks } = useContext(Context);
  const [search, setSearch] = useState('');
  const [searchRadio, setSearchRadio] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const path = window.location.pathname;
    const data = await fetchData(searchRadio, search, path);
    if (path === '/foods') {
      setMeals(data);
    } else {
      setDrinks(data);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        data-testid="search-input"
        type="text"
        id="search"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
        placeholder="Search Recipe"
      />
      <div className="radio">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
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
