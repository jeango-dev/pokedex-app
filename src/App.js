import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonDetail from './components/PokemonDetail';
import Pokedex from './components/Pokedex';
import UserInput from './components/UserInput';
import ProtectedRoutes from './components/ProtectedRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
// import LoadingScreen from './components/LoadingScreen';
// import { useEffect, useState } from 'react';

function App() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => setLoading(), 1200);
  // }, []);

  return (
    <HashRouter>
      {/* {loading ? ( */}
      {/* <LoadingScreen /> */}
      {/* ) : ( */}
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>
        </Routes>
        <Footer />
      </div>
      {/* )} */}
    </HashRouter>
  );
}

export default App;
