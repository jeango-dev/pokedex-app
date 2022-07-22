import '../styles/pokedex.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';
import { Form } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';
import { Link } from 'react-router-dom';
import ErrorPokemon from './ErrorPokemon';

const Pokemons = () => {
  const user = useSelector((state) => state.user);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [pokemonsTable, setPokemonsTable] = useState([]);
  const [typesPokemons, setTypesPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // document.body.style.backgroundColor = colors[colorIndex];
    // setError(false);
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
      .then((res) => {
        setPokemons(res.data.results);
        setPokemonsTable(res.data.results);
      });
    setTimeout(() => setLoading(), 1200);
    // setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypesPokemons(res.data.results));
    // setTimeout(() => setLoading(), 1200);
  }, []);

  const submit = (e) => {
    // setLoading(true);
    setSearchPokemon(e.target.value);
    search(e.target.value);
    // setTimeout(() => setLoading(), 1200);
  };

  const search = (SearchType) => {
    // eslint-disable-next-line array-callback-return
    const resultSearch = pokemonsTable.filter((element) => {
      if (element.name.toString().includes(SearchType.toString())) {
        return element;
      }
    });
    setPage(1);
    setPokemons(resultSearch);
  };

  const filterTypes = (e) => {
    if (e.target.value !== '') {
      // setLoading(true);
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
      // setTimeout(() => setLoading(), 1200);
    } else {
      // setLoading(false);
      axios
        .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
        .then((res) => setPokemons(res.data.results));
      // setTimeout(() => setLoading(), 1200);
    }
  };

  // const [colorIndex, setColorIndex] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const colors = ['#263547', 'white'];

  // Background

  // function handleChangeIndex() {
  //   const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
  //   setColorIndex(next);
  // }

  // document.body.style = `background:  ${isDark ? 'rgb(29, 27, 27)' : 'rgb(253, 253, 253)'}`

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

  // console.log(pokemonPaginated);
  // console.log(pokemons);
  // console.log(typesPokemons);

  if (error) {
    return (
      <div className="pokedex-screen">
        <ErrorPokemon />
      </div>
    );
  }

  return (
    <>
      <div className="pokedex text-center">
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
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <i class="fa-solid fa-angles-left"></i>
            </button>
            <button
              className="btns-pokedex"
              onClick={() => setPage(page - 1)}
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
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="btns-pokedex"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button
              className="btns-pokedex"
              onClick={() => setPage(totalPages)}
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
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="btns-pokedex"
            onClick={() => setPage(page - 1)}
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
              onClick={() => setPage(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="btns-pokedex"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          <button
            className="btns-pokedex"
            onClick={() => setPage(totalPages)}
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
