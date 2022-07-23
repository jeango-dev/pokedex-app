import '../styles/userInput.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import pokemons from '../img/pokemons.png';
import LoadingScreen from '../components/LoadingScreen';

const PokemonInput = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(), 1200);
  }, []);

  const getName = () => {
    dispatch(changeUser(userName));
    navigate('/pokedex');
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="container-user">
          <div className="col">
            <div>
              <img className="user-image" src={pokemons} alt="" />
            </div>
            <img
              className="user-gif"
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
      )}
    </div>
  );
};

export default PokemonInput;
