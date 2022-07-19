import '../styles/pokedex.css';
import '../styles/nav.css';
import '../styles/pokeballNav.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
// import pokeapi from '../img/pokeapi.png';
import { Button, Form } from 'react-bootstrap';

const Pokemons = () => {
  // const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [pokemons, setPokemons] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState('');
  const [pokemonsTable, setPokemonsTable] = useState([]);
  const [typesPokemons, setTypesPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // document.body.style.backgroundColor = colors[colorIndex];
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
      .then((res) => {
        setPokemons(res.data.results);
        setPokemonsTable(res.data.results);
      });
    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypesPokemons(res.data.results));
  }, []);

  const submit = (e) => {
    setSearchPokemon(e.target.value);
    search(e.target.value);
  };

  const search = (SearchType) => {
    const resultSearch = pokemonsTable.filter((element) => {
      if (element.name.toString().includes(SearchType.toString())) {
        return element;
      }
    });
    setPage(1);
    setPokemons(resultSearch);
  };

  console.log(search);

  const filterTypes = (e) => {
    if (e.target.value !== '') {
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
    } else {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
        .then((res) => setPokemons(res.data.results));
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

  const pokemonNumbers = 10;
  const lastIndex = pokemonNumbers * page;
  const firstIndex = lastIndex - pokemonNumbers;
  const pokemonPaginated = pokemons.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(pokemons.length / pokemonNumbers);

  let initialPage = page < 5 ? 1 : page - 4;
  let lastPage = totalPages;
  if (page < totalPages - 5) {
    if (page > 5) {
      lastPage = page;
    } else {
      lastPage = 5;
    }
  }

  const pageNumbers = [];
  for (let i = initialPage; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  // console.log(pokemonPaginated);

  // const submit = (e) => {
  //   console.log(searchPokemon);
  //   navigate(`/pokedex/${searchPokemon}`);
  //   setSearchPokemon(e.target.value);
  //   filterTypes(e.target.value);
  // };

  // console.log(pokemons);
  // console.log(typesPokemons);

  return (
    <>
      <div className="pokedex text-center">
        {/* <div className="navPokedex">
      
      <Button onClick={handleChangeIndex}>Background</Button>
      <div className="pokeball_nav">
        <div className="pokeball__button_nav"></div>
      </div>
    </div> */}
        {/* <div className="subnav"></div> */}

        {/* <img className="pokeapi" src={pokeapi} alt="" /> */}
        <div id="bg">
          <div id="circle_1">
            <div id="line"></div>
            <div id="line_pokeball"></div>
            <div id="circle_2"></div>
            <div id="circle_3"></div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="user-container">
            Welcolme <span className="user-pokedex">{user}</span>
          </h2>
          <div className="search">
            <Form.Control
              className="text-center"
              type="text"
              value={searchPokemon}
              onChange={submit}
              placeholder="Search by Pokemon"
            />
            <Button disabled variant="danger">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
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
            <Button
              variant="danger"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </Button>
            {pageNumbers.map((number) => (
              <Button
                active={page === number}
                variant="outline-success"
                key={number}
                onClick={() => setPage(number)}
              >
                {number}
              </Button>
            ))}
            <Button
              variant="danger"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>
          <div>
            {pokemonPaginated.map(
              (
                pokemon // En este caso pokemon puede ser o un objeto o un string "url"
              ) => (
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
              )
            )}
          </div>
        </div>
        <div className="paginationPokedex">
          <Button
            variant="danger"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </Button>
          {pageNumbers.map((number) => (
            <Button
              active={page === number}
              variant="outline-success"
              key={number}
              onClick={() => setPage(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="danger"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Pokemons;
