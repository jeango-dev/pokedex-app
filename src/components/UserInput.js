import '../styles/userInput.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import pokemons from '../img/pokemons.png';
import pokemon from '../img/pokemon.webp';

const PokemonInput = () => {
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate('/pokedex');
  };

  return (
    <div className="container-user row text-center align-items-center justify-content-center">
      <div>
        <div className="nav-container">
          <img className="user-image" src={pokemon} alt="" />
        </div>
        <div>
          <img className="user-image" src={pokemons} alt="" />
        </div>

        <img
          className="user-image2"
          src="https://sergiofrancodev.com/pokeball.gif"
          alt=""
        />
        <h2 className="title-trainer">Hello Master Pokemon</h2>
        <input
          style={{ backgroundColor: '#dc3545', color: 'white' }}
          className="user-input"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
        />
        <button
          style={{ backgroundColor: '#dc3545', color: 'white' }}
          className="user-btn"
          onClick={getName}
        >
          <i className="fas fa-xl fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default PokemonInput;
