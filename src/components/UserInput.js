import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";

const PokemonInput = () => {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getName = () => {
    dispatch(changeUser(userName));
    navigate("/pokedex");
  };

  return (
    <div>
      <h1>Hello Trainer!</h1>
      <p>Give me your name to start</p>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={getName}>Enviar</button>
    </div>
  );
};

export default PokemonInput;
