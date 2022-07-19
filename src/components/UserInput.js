import '../styles/userInput.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import pokemons from '../img/pokemons.png';

const PokemonInput = () => {
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate('/pokedex');
  };

  return (
    <div
      style={{ backgroundColor: '#dc3545', color: 'white' }}
      className="container-user vh-100 row text-center align-items-center justify-content-center"
    >
      <div>
        <h1>Hello Trainer!</h1>
        <img style={{ width: '300px' }} src={pokemons} alt="" />
        <h4>Give me your name to start</h4>
        <input
          className="user-input"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="user-btn" onClick={getName}>
          <i className="fas fa-xl fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default PokemonInput;
