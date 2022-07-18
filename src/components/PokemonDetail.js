import axios from 'axios';
import '../styles/pokemonDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ColorCard from './ColorCard';
import { ProgressBar } from 'react-bootstrap';

const PokemonDetail = () => {
  const [pokemons, setPokemons] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      setPokemons({
        name: res.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${res.data.id}.png`,
        imageShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${res.data.id}.png`,
        id: res.data.id,
        type: res.data.types,
        height: res.data.height,
        weight: res.data.weight,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
        abilities: res.data.abilities,
        moves: res.data.moves,
        typeColor: res.data.types[0].type.name,
      })
    );
  }, [id]);

  // console.log(pokemons.abilities?.[0]);

  // document.body.style = `background: ${ColorCard(pokemons.typeColor)};`;

  return (
    <div
      style={{ borderColor: ColorCard(pokemons.typeColor) }}
      className="pokemonDetail"
    >
      <Link to={'/pokedex'}>
        <button>Back to the pokedex</button>
      </Link>
      <div>
        <img className="imageShinyD" src={pokemons.imageShiny} alt="" />
        <img className="imageNormalD" src={pokemons.image} alt="" />
        <div className="pokemonData">
          <h1>{pokemons.name}</h1>
          <h3># {pokemons.id}</h3>
          <h3>Weight {pokemons.weight}</h3>
          <h3>Height {pokemons.height}</h3>
          <h3>Type</h3>
          <p className="pokemonDType">
            {pokemons.type?.map((type) => {
              return (
                <span
                  style={{ background: ColorCard(type.type.name) }}
                  className="typeCard"
                  key={type.type.url}
                >
                  {' '}
                  {type.type.name}{' '}
                </span>
              );
            })}
          </p>
          <div>
            <p>
              Hp:{' '}
              <ProgressBar
                style={{ height: '25px' }}
                variant="info"
                max="100"
                animated
                now={pokemons.hp}
              ></ProgressBar>
            </p>
            <p>
              Speed:{' '}
              <ProgressBar
                style={{ height: '25px' }}
                max="100"
                animated
                now={pokemons.speed}
              ></ProgressBar>
            </p>
            <p>
              Attack:{' '}
              <ProgressBar
                style={{ height: '25px' }}
                variant="danger"
                max="100"
                animated
                now={pokemons.attack}
              ></ProgressBar>
            </p>
            <p>
              Defense:{' '}
              <ProgressBar
                style={{ height: '25px' }}
                variant="warning"
                max="100"
                animated
                now={pokemons.defense}
              ></ProgressBar>
            </p>
          </div>
          <div>
            <h3>Abilites</h3>
            {pokemons.abilities?.map((ability) => {
              return (
                <ul key={ability.ability.url}>
                  <li className="abilitiyCard"> {ability.ability.name} </li>
                </ul>
              );
            })}
          </div>
          {/* <div>
            <h3>Moves</h3>
            {pokemons.moves?.map((move) => {
              return (
                <ul key={move.move.url}>
                  <li className="abilitiyCard"> {move.move.name} </li>
                </ul>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
