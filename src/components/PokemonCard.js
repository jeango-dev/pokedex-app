import '../styles/pokemonCard.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ColorCard from './ColorCard';
import { useDispatch } from 'react-redux';
// import { setIsloading } from '../store/slices/isLoading.slices';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

function PokemonCard({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setIsloading(true));
    // setTimeout(() => dispatch(setIsloading(false)), 1200);
    setLoading(true);
    axios.get(pokemonUrl).then((res) =>
      setPokemon({
        name: res.data.name,
        id: res.data.id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${res.data.id}.png`,
        imageShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${res.data.id}.png`,
        type: res.data.types,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
        typeColor: res.data.types[0].type.name,
      })
    );
    setTimeout(() => setLoading(false), 1200);
  }, [dispatch, pokemonUrl]);

  // console.log(pokemonUrl);
  // console.log(pokemon);

  return (
    <div className="d-inline">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div
          style={{
            background: `linear-gradient(to top, white 0%,
            white 50%, ${ColorCard(pokemon.typeColor)} 50%, ${ColorCard(
              pokemon.typeColor
            )} 100%)`,
          }}
          className="pokemonCard"
        >
          <div className="titleCard">
            <div className="nameCard">
              <h5>{pokemon.name}</h5>
            </div>
            <div className="numberCard">
              <h5>#{pokemon.id}</h5>
            </div>
          </div>
          <Link to={`/pokedex/${pokemon.id}`}>
            <img className="imageShiny" src={pokemon.imageShiny} alt={''} />
            <img className="imageNormal" src={pokemon.image} alt={''} />
          </Link>
          <div className="typeContainer">
            <p>
              {pokemon.type?.map((type) => {
                return (
                  <span
                    style={{ background: ColorCard(type.type.name) }}
                    className="types"
                    key={type.type.url}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
