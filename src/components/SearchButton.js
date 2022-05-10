import React, { useContext } from 'react';
import searchIcon from '../images/searchIcon.svg';
import { Context } from '../context/AppContext';

function SearchIcon() {
  const { setSearchBarStatus } = useContext(Context);
  return (
    <button type="button" onClick={ () => setSearchBarStatus((prev) => !prev) }>
      <img data-testid="search-top-btn" src={ searchIcon } alt="Ícone de Busca" />
    </button>
  );
}

export default SearchIcon;
