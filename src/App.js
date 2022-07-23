import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Pokedex from './Pages/Pokedex';
import UserInput from './Pages/UserInput';
import ProtectedRoutes from './components/ProtectedRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
// import DarkMode from './components/DarkMode';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Header />
        {/* <DarkMode /> */}
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
