import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/AppContext';

function Main() {
  const { searchBarStatus } = useContext(Context);
  return <main>{searchBarStatus && <SearchBar />}</main>;
}

export default Main;
