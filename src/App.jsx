import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MenuSignup from './pages/MenuSignup';
import SignUsuario from './pages/SignUsuario';

function App() {
  return (

    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<MenuSignup />} />
        <Route path='/newusuario' element={<SignUsuario />} />
      </Routes>
  );
}

export default App;
