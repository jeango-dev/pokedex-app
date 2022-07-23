import '../styles/pokemonCard.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ColorCard from './ColorCard';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'reactstrap';
import { ProgressBar } from 'react-bootstrap';
// import ErrorPokemon from './ErrorPokemon';

function PokemonCard({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState({});
  const [show, setShow] = useState(false);
  // const [error, setError] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    // setError(false);
    axios.get(pokemonUrl).then((res) =>
      setPokemon({
        name: res.data.name,
        id: res.data.id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${res.data.id}.png`,
        imageShiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${res.data.id}.png`,
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
      }).catch((error) => {
        console.log(error);
        // setError(true);
      })
    );
  }, [dispatch, pokemonUrl]);

  // console.log(pokemonUrl);
  // console.log(pokemon);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(pokemon);

  // if (!error) {
  return (
    <div className="d-inline">
      <div
        style={{
          borderColor: ColorCard(pokemon.typeColor),
          background: `linear-gradient(to top, white 0%,
            white 50%, ${ColorCard(pokemon.typeColor)} 50%, ${ColorCard(
            pokemon.typeColor
          )} 100%)`,
        }}
        className="pokemonCard"
      >
        <div>
          <div className="titleCard">
            <div className="numberCard">
              <h5>#{pokemon.id}</h5>
            </div>
          </div>
          <img
            onClick={handleShow}
            className="imageShiny"
            src={pokemon.imageShiny}
            alt={''}
          />
          <img
            onClick={handleShow}
            className="imageNormal"
            src={pokemon.image}
            alt={''}
          />
          <div className="nameCard">
            <h5>{pokemon.name}</h5>
          </div>
          <div className="typeContainer">
            <p>
              {pokemon.type?.map((type) => {
                return (
                  <span
                    style={{
                      background: ColorCard(type.type.name),
                    }}
                    className="types"
                    key={type.type.url}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </p>
          </div>

          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body
                className="modal-container"
                style={{
                  borderColor: ColorCard(pokemon.typeColor),
                  background: `linear-gradient(to top, white 0%,
            white 70%, ${ColorCard(pokemon.typeColor)} 70%, ${ColorCard(
                    pokemon.typeColor
                  )} 100%)`,
                }}
              >
                <div className="text-center name-modal">
                  <h1>{pokemon.name}</h1>
                </div>

                <Row>
                  <Col>
                    <div>
                      <div className="image-modal-container">
                        <img
                          className="imageNormal-modal"
                          src={pokemon.image}
                          alt=""
                        />
                        <img
                          className="imageShiny-modal"
                          src={pokemon.imageShiny}
                          alt={''}
                        />
                      </div>

                      {/* <div className="nameCard">
                <h5>{pokemon.name}</h5>
              </div> */}
                    </div>
                  </Col>
                </Row>
                <Row className="types-pokemon-colors text-center">
                  <Col>
                    <h4>Normal</h4>
                  </Col>
                  <Col>
                    <h4>Shiny</h4>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="type-container-modal">
                      <p>
                        {pokemon.type?.map((type) => {
                          return (
                            <span
                              style={{
                                background: ColorCard(type.type.name),
                                textTransform: 'capitalize',
                              }}
                              className="types-modal"
                              key={type.type.url}
                            >
                              {type.type.name}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row className="stats-container">
                  <Col className="text-center" xs={6}>
                    <div>
                      <h4>Stats</h4>
                    </div>
                    <div className="stats">
                      <p>
                        Hp {pokemon.hp}/100
                        <ProgressBar
                          style={{ height: '25px' }}
                          variant="info"
                          max="100"
                          animated
                          now={pokemon.hp}
                        ></ProgressBar>
                      </p>
                      <p>
                        Speed {pokemon.speed}/100
                        <ProgressBar
                          style={{ height: '25px' }}
                          max="100"
                          animated
                          now={pokemon.speed}
                        ></ProgressBar>
                      </p>
                      <p>
                        Attack {pokemon.attack}/100
                        <ProgressBar
                          style={{ height: '25px' }}
                          variant="danger"
                          max="100"
                          animated
                          now={pokemon.attack}
                        ></ProgressBar>
                      </p>
                      <p>
                        Defense {pokemon.defense}/100
                        <ProgressBar
                          style={{ height: '25px' }}
                          variant="warning"
                          max="100"
                          animated
                          now={pokemon.defense}
                        ></ProgressBar>
                      </p>
                    </div>
                  </Col>
                  <Col className="text-center other-stats">
                    <h4>Measures</h4>
                    <h5>Height </h5>
                    <p>{pokemon.height} m</p>
                    <h5>Weight </h5>
                    <p>{pokemon.weight} kg</p>
                    <div className="abilities-container">
                      <h4>Abilities</h4>
                      {pokemon.abilities?.map((ability) => {
                        return (
                          <ul className="abilities" key={ability.ability.url}>
                            <li> {ability.ability.name} </li>
                          </ul>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </>
        </div>
      </div>
    </div>
  );
}

//   else {
//     return (
//       <div className="pokedex-screen">
//         <ErrorPokemon />
//       </div>
//     );
//   }
// }

export default PokemonCard;
