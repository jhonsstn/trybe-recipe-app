import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileButton from '../components/ProfileButton';
import SearchButton from '../components/SearchButton';

function Header({ title }) {
  const { drinkId, foodId } = useParams();

  const renderProfileButton = () => {
    const page = window.location.pathname;
    if (
      page !== `/drinks/${drinkId}`
      && page !== `/foods/${foodId}`
      && page !== `/drinks/${drinkId}/in-progress`
      && page !== `/foods/${foodId}/in-progress`
    ) {
      return <ProfileButton />;
    }
  };

  const renderSearchButton = () => {
    const page = window.location.pathname;
    if (
      page === '/foods'
      || page === '/drinks'
      || page === '/explore/foods/nationalities'
    ) {
      return <SearchButton />;
    }
  };

  return (
    <header>
      {renderProfileButton()}
      <h3 data-testid="page-title">{title}</h3>
      {renderSearchButton()}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {};

export default Header;
