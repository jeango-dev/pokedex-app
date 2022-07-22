import React from 'react';
import errorPokemon from '../img/errorpokemon.png';

const ErrorPokemon = () => {
  return (
    <div className="pokedex-screen">
      <img
        src={errorPokemon}
        alt="Hubo un error buscando tu pokemon"
        className="pokedex-no-screen"
      />
    </div>
  );
};

export default ErrorPokemon;
