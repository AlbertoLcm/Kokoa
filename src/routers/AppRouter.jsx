import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MenuSignup from '../pages/MenuSignup';
import SignUsuario from '../pages/SignUsuario';
import SignNegocio from '../pages/SignNegocio';
import PrivateRoute from "./PrivateRoute";
import SignPatrocinador from "../pages/SignPatrocinador";

function AppRouter() {
    return(
        <div className='App'>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                    }
                />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<MenuSignup />} />
                <Route path='/newusuario' element={<SignUsuario />} />
                <Route path='/newnegocio' element={<SignNegocio />} />
                <Route path='/newpatrocinador' element={<SignPatrocinador />} />

            </Routes>
        </div>
    );
}

export default AppRouter;