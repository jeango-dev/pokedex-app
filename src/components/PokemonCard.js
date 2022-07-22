import '../styles/pokemonCard.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ColorCard from './ColorCard';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import LoadingScreen from './LoadingScreen';
// import ErrorPokemon from './ErrorPokemon';

function PokemonCard({ pokemonUrl }) {
  const [pokemon, setPokemon] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    // setError(false);
    setLoading(true);
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
      }).catch((error) => {
        console.log(error);
        // setError(true);
      })
    );
    setTimeout(() => setLoading(), 1200);
  }, [dispatch, pokemonUrl]);

  // console.log(pokemonUrl);
  // console.log(pokemon);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(pokemon);

  // if (!error) {
  return (
    <div className="d-inline pokemoncard-container">
      {loading ? (
        <LoadingScreen />
      ) : (
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
                  <Modal.Title>
                    <div className="nameCard">
                      <h5>{pokemon.name}</h5>
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    borderColor: ColorCard(pokemon.typeColor),
                    background: `linear-gradient(to top, white 0%,
              white 50%, ${ColorCard(pokemon.typeColor)} 50%, ${ColorCard(
                      pokemon.typeColor
                    )} 100%)`,
                  }}
                >
                  <div>
                    <div className="titleCard">
                      {/* <div className="numberCard">
                    <h5>#{pokemon.id}</h5>
                  </div> */}
                    </div>
                    <div className="image-modal-container">
                      <img
                        className="imageShiny-modal"
                        src={pokemon.imageShiny}
                        alt={''}
                      />
                      <img
                        className="imageNormal-modal"
                        src={pokemon.image}
                        alt=""
                      />
                    </div>
                    {/* <div className="nameCard">
                  <h5>{pokemon.name}</h5>
                </div> */}
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
                  </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>
            </>
          </div>
        </div>
      )}
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
