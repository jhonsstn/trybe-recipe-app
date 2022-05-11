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
    <form className="flex flex-col items-center" onSubmit={ handleSubmit }>
      <input
        className="mt-4 mb-2 w-[200px] rounded-sm h-10
        border-2 border-orange-700 placeholder:pl-1
        placeholder:text-orange-300 text-lato"
        data-testid="search-input"
        type="text"
        id="search"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
        placeholder="Search Recipe"
      />
      <div className="radio">
        <label className="px-1" htmlFor="ingredient">
          <input
            className="mr-0.5"
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
          />
          Ingredient
        </label>
        <label className="px-1" htmlFor="name">
          <input
            className="mr-0.5"
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
          />
          Name
        </label>
        <label className="px-1" htmlFor="first-letter">
          <input
            className="mr-0.5"
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="search-radio"
            onClick={ ({ target }) => setSearchRadio(target.id) }
          />
          First Letter
        </label>
      </div>
      <button
        className="w-36 mt-2 mb-6  px-2 py-2 rounded-sm bg-orange-700
        text-orange-50 hover:bg-orange-500 focus:bg-orange-500"
        data-testid="exec-search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
