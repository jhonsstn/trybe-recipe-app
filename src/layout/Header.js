import PropTypes from 'prop-types';
import React from 'react';

function Header({ title, children }) {
  return (
    <header>
      {children[0] || children}
      <h3 data-testid="page-title">{title}</h3>
      {children[1]}
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
