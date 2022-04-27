import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Context } from '../context/AppContext';

function Header({ title, children }) {
  const { searchBarStatus } = useContext(Context);
  return (
    <header>
      {children[0] || children}
      <h3 data-testid="page-title">{title}</h3>
      {children[1]}
      {searchBarStatus && (
        <input
          data-testid="search-input"
          type="text"
          name="search"
          id="search"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
