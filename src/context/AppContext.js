import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const Context = createContext();

function AppContext({ children }) {
  const contextValue = {};

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

AppContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
