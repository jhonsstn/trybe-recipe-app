import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';

function ProfileIcon() {
  const { setSearchBarStatus } = useContext(Context);
  return (
    <Link to="/profile" onClick={ () => setSearchBarStatus(false) }>
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Ícone do Perfil"
      />
    </Link>
  );
}

export default ProfileIcon;
