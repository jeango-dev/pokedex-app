import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { setIsloading } from "./isLoading.slices";

export const pokedexSlices = createSlice({
  name: "pokedex",
  initialState: [],
  reducers: {
    setPokemons: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPokemons } = pokedexSlices.actions;

// export const getPokemons = () => (dispatch) => {
//   dispatch(setIsloading(true));
//   return axios.get
//     .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126")
//     .then((res) => setPokemons(res.data.results))
//     .finally(() => dispatch(setIsloading(false)));
// };

export default pokedexSlices.reducer;
