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

  // console.log(pokemons);

  return (
    <div>
      <h1>{pokemons.name}</h1>
      <img className="imageShiny" src={pokemons.imageShiny} alt="" />
      <img className="imageNormal" src={pokemons.image} alt="" />
    </div>
  );
};

export default PokemonDetail;
