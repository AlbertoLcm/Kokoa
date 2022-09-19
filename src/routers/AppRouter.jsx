import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MenuSignup from '../pages/MenuSignup';
import SignUsuario from '../pages/SignUsuario';
import SignNegocio from '../pages/SignNegocio';

function AppRouter() {
    return(
        <div className='App'>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<MenuSignup />} />
                <Route path='/newusuario' element={<SignUsuario />} />
                <Route path='/newnegocio' element={<SignNegocio />} />
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
}

export default AppRouter;