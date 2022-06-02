import axios from "axios";
import "../styles/pokemonDetail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const [pokemons, setPokemons] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      setPokemons({
        name: res.data.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${res.data.id}.png`,
        imageShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${res.data.id}.png`,
      })
    );
  }, [id]);

  console.log(pokemons);

  return (
    <div className="pokemonDetail">
      <h1>{pokemons.name}</h1>
      <img className="imageShinyD" src={pokemons.imageShiny} alt="" />
      <img className="imageNormalD" src={pokemons.image} alt="" />
      <h2>
        Weight{} Height{}
      </h2>
    </div>
  );
};

export default PokemonDetail;
