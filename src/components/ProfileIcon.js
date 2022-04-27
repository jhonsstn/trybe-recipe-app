import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

function ProfileIcon() {
  return (
    <Link to="/profile">
      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="Ícone do Perfil"
      />
    </Link>
  );
}

export default ProfileIcon;
