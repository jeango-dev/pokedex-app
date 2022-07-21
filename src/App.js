import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PokemonDetail from './components/PokemonDetail';
import Pokedex from './components/Pokedex';
import UserInput from './components/UserInput';
import ProtectedRoutes from './components/ProtectedRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
// import { useSelector } from 'react-redux';
// import LoadingScreen from './components/LoadingScreen';
// import { useEffect, useState } from 'react';
// import { setIsloading } from './store/slices/isLoading.slices';
// import { useEffect } from 'react';

function App() {
  // const isLoading = useSelector((state) => state.isLoading);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => dispatch(setIsloading(false)), 1000);
  //   dispatch(setIsloading(true));
  // }, [dispatch]);

  return (
    <HashRouter>
      {/* {loading && <LoadingScreen />} */}
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonDetail />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
