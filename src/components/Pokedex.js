import "../styles/pokedex.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";

const Pokemons = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState("");
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);

  //Pagination

  const pokemonNumbers = 8;
  const lastIndex = pokemonNumbers * page;
  const firstIndex = lastIndex - pokemonNumbers;
  const pokemonPaginated = pokemons.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemons.length / pokemonNumbers);

  let initialPage = page < 5 ? 1 : page - 4;
  let lastPage = totalPages;
  if (page < totalPages - 5) {
    if (page > 5) {
      lastPage = page + 4;
    } else {
      lastPage = 9;
    }
  }

  const pageNumbers = [];
  for (let i = initialPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  console.log(pokemonPaginated);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
      .then((res) => setPokemons(res.data.results));
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypes(res.data.results));
  }, []);

  const search = () => {
    // console.log(pokemonSearch);
    navigate(`/pokedex/${pokemonSearch}`);
  };

  const filterPokemons = (e) => {
    // alert(`se filtraron los personajes ${e.target.value}`);
    if (e.target.value !== "") {
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
    } else {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
        .then((res) => setPokemons(res.data.results));
    }
  };

  // console.log(pokemons);
  // console.log(types);

  return (
    <div className="pokedex">
      <div>
        <h1>Pokedex Shiny</h1>
        <p>Welcome {user}, here you can find your favorite shiny pokemon</p>
      </div>
      <div>
        <input
          type="text"
          value={pokemonSearch}
          onChange={(e) => setPokemonSearch(e.target.value)}
          placeholder="Search by pokemon"
        />
        <button onClick={search}>Search</button>
      </div>
      <div>
        <select name="Selecet by type" onChange={filterPokemons}>
          <option value="">All pokemons</option>
          {types.map((type) => (
            <option key={type.name} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
        <div>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => setPage(number)}>
              {number}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
        {pokemonPaginated.map(
          (
            pokemon // En este caso pokemon puede ser o un objeto o un string "url"
          ) => (
            <PokemonCard
              key={
                pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
              }
              pokemonUrl={
                pokemon.url !== undefined ? pokemon.url : pokemon.pokemon.url
              }
            />
          )
        )}
      </div>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setPage(number)}>
            {number}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pokemons;
