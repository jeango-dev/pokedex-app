/* eslint-disable array-callback-return */
import '../styles/pokedex.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import { Form } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';
import { Link } from 'react-router-dom';
// import ErrorPokemon from './ErrorPokemon';

const Pokemons = () => {
  const user = useSelector((state) => state.user);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [pokemonsTable, setPokemonsTable] = useState([]);
  const [typesPokemons, setTypesPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // setError(false);
    setLoading(true);
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
      .then((res) => {
        setPokemons(res.data.results);
        setPokemonsTable(res.data.results);
      });
    setTimeout(() => setLoading(), 1200);
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypesPokemons(res.data.results));
    setTimeout(() => setLoading(), 1200);
  }, []);

  const submit = (e) => {
    setSearchPokemon(e.target.value);
    search(e.target.value);
  };

  const search = (SearchType) => {
    setLoading(true);
    const resultSearch = pokemonsTable.filter((element) => {
      if (element.name.toString().includes(SearchType.toString())) {
        return element;
      }
    });
    setTimeout(() => setLoading(), 1200);
    setPage(1);
    setPokemons(resultSearch);
  };

  const filterTypes = (e) => {
    if (e.target.value !== '') {
      setLoading(true);
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
      setTimeout(() => setLoading(), 1200);
    } else {
      setLoading(true);
      axios
        .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
        .then((res) => setPokemons(res.data.results));
      setTimeout(() => setLoading(), 1200);
    }
  };

  // Pagination

  const pokemonNumbers = 8;
  const lastIndex = pokemonNumbers * page;
  const fristIndex = lastIndex - pokemonNumbers;
  const pokemonPaginated = pokemons.slice(fristIndex, lastIndex);
  const totalPages = Math.ceil(pokemons?.length / pokemonNumbers);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i < page + 5 && i > page - 7 + 6) {
      pageNumbers.push(i);
    }
  }

  const firstPage = () => {
    setLoading(true);
    setPage(1);
    setTimeout(() => setLoading(), 1200);
  };

  const previousPage = () => {
    setLoading(true);
    setPage(page - 1);
    setTimeout(() => setLoading(), 1200);
  };

  const nextPage = () => {
    setLoading(true);
    setPage(page + 1);
    setTimeout(() => setLoading(), 1200);
  };

  const lastPage = () => {
    setLoading(true);
    setPage(totalPages);
    setTimeout(() => setLoading(), 1200);
  };

  const onPage = (number) => {
    setLoading(true);
    setPage(number);
    setTimeout(() => setLoading(), 1200);
  };

  // console.log(pokemonPaginated);
  // console.log(pokemons);
  // console.log(typesPokemons);

  // if (error) {
  //   return (
  //     <div className="pokedex-screen">
  //       <ErrorPokemon />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={`pokedex text-center`}>
        <div className="exit-container">
          <Link to={'/'}>
            <button clasName="btn-exit">
              <i className="fa-solid fa-sign-out-alt"></i>
            </button>
          </Link>
        </div>

        <div className="text-center">
          <h2 className="user-container">
            Welcolme <span className="user-pokedex">{user}</span>
          </h2>
          <h5>Find your favorite pokemon</h5>
          <div className="search">
            <Form.Control
              className="text-center"
              type="text"
              value={searchPokemon}
              onChange={submit}
              placeholder="Search Pokemon"
            />
            <button disabled className="btns-pokedex">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="select-container">
            <Form.Select className="select-pokedex" onChange={filterTypes}>
              <option value="">All pokemons</option>
              {typesPokemons.map((type) => (
                <option key={type.name} value={type.url}>
                  {type.name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="text-center">
          <div className="paginationPokedex">
            <button
              className="btns-pokedex"
              onClick={firstPage}
              disabled={page === 1}
            >
              <i class="fa-solid fa-angles-left"></i>
            </button>
            <button
              className="btns-pokedex"
              onClick={previousPage}
              disabled={page === 1}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            {pageNumbers.map((number) => (
              <button
                className={`btns-numbers ${
                  number === page ? 'btns-numbers-active' : ''
                }`}
                active={page === number}
                key={number}
                onClick={() => onPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="btns-pokedex"
              onClick={nextPage}
              disabled={page === totalPages}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button
              className="btns-pokedex"
              onClick={lastPage}
              disabled={page === totalPages}
            >
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div>
            {loading ? (
              <LoadingScreen />
            ) : (
              <div clasName="pokedex-container">
                {pokemonPaginated.map((pokemon) => {
                  return (
                    <PokemonCard
                      key={
                        pokemon.url !== undefined
                          ? pokemon.url
                          : pokemon.pokemon.url
                      }
                      pokemonUrl={
                        pokemon.url !== undefined
                          ? pokemon.url
                          : pokemon.pokemon.url
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="paginationPokedex">
          <button
            className="btns-pokedex"
            onClick={firstPage}
            disabled={page === 1}
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="btns-pokedex"
            onClick={previousPage}
            disabled={page === 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          {pageNumbers.map((number) => (
            <button
              className={`btns-numbers ${
                number === page ? 'btns-numbers-active' : ''
              }`}
              active={page === number}
              key={number}
              onClick={() => onPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="btns-pokedex"
            onClick={nextPage}
            disabled={page === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button
            className="btns-pokedex"
            onClick={lastPage}
            disabled={page === totalPages}
          >
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Pokemons;
