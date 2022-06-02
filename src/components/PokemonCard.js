import "../styles/pokemonCard.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ColorCard from "./ColorCard";
// import { useDispatch } from "react-redux";
// import { setIsloading } from "../store/slices/isLoading.slices";

function PokemonCard({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState({});
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setIsloading(true));
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
    // .finally(() => dispatch(setIsloading(false)));
  }, [pokemonUrl]);

  // console.log(pokemonUrl);
  // console.log(pokemon);

  return (
    <div
      style={{ borderColor: ColorCard(pokemon.typeColor) }}
      className="pokedexCard"
    >
      <div className="titleCard">
        <h3 style={{ background: ColorCard(pokemon.typeColor) }}>
          {pokemon.name} No. {pokemon.id}
        </h3>
      </div>
      <img className="imageShiny" src={pokemon.imageShiny} alt="" />
      <img className="imageNormal" src={pokemon.image} alt="" />
      <div>
        <p>
          {pokemon.type?.map((type) => {
            return (
              <span
                style={{ background: ColorCard(type.type.name) }}
                className="typeCard"
                key={type.type.url}
              >
                {" "}
                {type.type.name}{" "}
              </span>
            );
          })}
        </p>
      </div>
      <div
        style={{ background: ColorCard(pokemon.typeColor) }}
        className="descriptionCard"
      >
        <p>
          Hp: {pokemon.hp} Speed: {pokemon.speed}
        </p>
        <p>
          Attack: {pokemon.attack} Defense: {pokemon.defense}
        </p>
      </div>
    </div>
  );
}

export default PokemonCard;
