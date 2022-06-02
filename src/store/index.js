import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user.slice";
import isLoading from "./slices/isLoading.slices";
import pokedex from "./slices/pokedex.slices";

export default configureStore({
  reducer: {
    user,
    isLoading,
    pokedex,
  },
});
