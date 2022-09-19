import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import MenuSignup from './pages/MenuSignup';
import SignUsuario from './pages/SignUsuario';
import SignNegocio from './pages/SignNegocio';

function App() {
  return (

    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<MenuSignup />} />
        <Route path='/newusuario' element={<SignUsuario />} />
        <Route path='/newnegocio' element={<SignNegocio />} />
      </Routes>

      <Footer />
    </div>
    
  );
}

export default App;
