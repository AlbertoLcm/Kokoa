import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MenuSignup from '../pages/MenuSignup';
import SignUsuario from '../pages/SignUsuario';
import SignNegocio from '../pages/SignNegocio';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignPatrocinador from "../pages/SignPatrocinador";
import SignArtista from "../pages/SignArtista";
import Error from "../pages/404";
import routes from "../helpers/routes";
import roles from "../helpers/roles";
import RolArtista from "../pages/RolArtista";
import RegistroEvento from "../pages/RegistroEvento";
import Basic from "../pages/Basic";

function AppRouter() {
    return(
        <div className='App'>
            <Routes>
                <Route exact path={routes.home} element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                    } />
                <Route exact path={routes.login} element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route exact path={routes.signup} element={
                    <PublicRoute>
                        <MenuSignup />
                    </PublicRoute>
                } />
                <Route exact path={routes.newusuario} element={
                    <PublicRoute>
                        <SignUsuario />
                    </PublicRoute>
                } />
                <Route exact path={routes.newnegocio} element={
                    <PublicRoute>
                        <SignNegocio />
                    </PublicRoute>
                } />
                <Route exact path={routes.newpatrocinador} element={
                    <PublicRoute>
                        <SignPatrocinador />
                    </PublicRoute>
                } />
                <Route exact path={routes.newartista} element={
                    <PublicRoute>
                        <SignArtista />
                    </PublicRoute>
                } />
                <Route exact path={routes.rolartista}  element={
                    <PrivateRoute Role={roles.artista}>
                        <RolArtista />
                    </PrivateRoute>
                } />
                <Route exact path={routes.registrarevento} element={
                    <PrivateRoute>
                        <RegistroEvento />
                    </PrivateRoute>
                } />

                <Route path="*" element={<Error />} />

            </Routes>
        </div>
    );
}

export default AppRouter;