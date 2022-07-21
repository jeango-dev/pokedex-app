import React from 'react';
import '../styles/header.css';
import pokemon from '../img/pokemon.webp';

const Nav = () => {
  return (
    <div className="nav-container">
      <img className="nav-image" src={pokemon} alt="" />
    </div>
  );
};

export default Nav;
