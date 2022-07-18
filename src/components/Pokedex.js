import '../styles/pokedex.css';
import '../styles/pokeballNav.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import pokemon from '../img/pokemon.webp';
import { Button, Form } from 'react-bootstrap';

const Pokemons = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
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

  console.log(pokemonPaginated);

  useEffect(() => {
    // document.body.style.backgroundColor = colors[colorIndex];
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
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
    if (e.target.value !== '') {
      axios.get(e.target.value).then((res) => setPokemons(res.data.pokemon));
    } else {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')
        .then((res) => setPokemons(res.data.results));
    }
  };

  // console.log(pokemons);
  // console.log(types);

  return (
    <div className="pokedex text-center">
      {/* <div className="navPokedex">
        
        <Button onClick={handleChangeIndex}>Background</Button>
        <div className="pokeball_nav">
          <div className="pokeball__button_nav"></div>
        </div>
      </div> */}
      {/* <div className="subnav"></div> */}
      <div id="bg">
        {/* <div id="circle_in"></div> */}
        <div id="circle_1"></div>
        <div id="line"></div>
        <div id="circle_2"></div>
        <div id="circle_3"></div>
      </div>

      <div>
        <h2>Welcolme {user}!</h2>
        <p>Here you can find your favorite shiny pokemon</p>
        <div className="search mx-4">
          <Form.Control
            className="text-center"
            type="text"
            value={pokemonSearch}
            onChange={(e) => setPokemonSearch(e.target.value)}
            placeholder="Search by Pokemon"
          />
          <Button variant="danger" onClick={search}>
            Search
          </Button>
        </div>
      </div>
      <div>
        <h4>Select by type Pokemon</h4>
        <Form.Select name="Selecet by type" onChange={filterPokemons}>
          <option value="">All pokemons</option>
          {types.map((type) => (
            <option key={type.name} value={type.url}>
              {type.name}
            </option>
          ))}
        </Form.Select>
        <div className="paginationPokedex">
          <Button
            variant="danger"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </Button>
          {pageNumbers.map((number) => (
            <Button
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
            Next
          </Button>
        </div>
        <div>
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
      </div>
      <div className="paginationPokedex">
        <Button
          variant="danger"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
        {pageNumbers.map((number) => (
          <Button
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
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pokemons;
