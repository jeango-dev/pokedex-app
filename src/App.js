import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import Pokedex from "./components/Pokedex";
import UserInput from "./components/UserInput";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useSelector } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      {isLoading && <LoadingScreen />}
      <div className="App">
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
