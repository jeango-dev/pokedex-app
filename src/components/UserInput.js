import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import trainer from '../img/trainer.webp';
import { Button } from 'react-bootstrap';

const PokemonInput = () => {
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate('/pokedex');
  };

  return (
    <div className="vh-100 row text-center align-items-center justify-content-center">
      <div>
        <h1>Hello Trainer!</h1>
      </div>
      <div>
        <img style={{ height: '250px' }} src={trainer} alt="trainer" />
      </div>
      <div>
        <h4>Give me your name to start</h4>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button onClick={getName}>Enviar</Button>
      </div>
    </div>
  );
};

export default PokemonInput;
