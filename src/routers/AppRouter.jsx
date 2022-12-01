import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuSignup from "../pages/MenuSignup";
import SignUsuario from "../pages/SignUsuario";
import SignNegocio from "../pages/SignNegocio";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import SignPatrocinador from "../pages/SignPatrocinador";
import SignArtista from "../pages/SignArtista";
import ConPerf from "../pages/ConPerf"
import Error from "../pages/404";
import routes from "../helpers/routes";
import roles from "../helpers/roles";
import RolArtista from "../pages/RolArtista";
import RegistroEvento from "../pages/RegistroEvento";
import Login from "../pages/Login";
import Home from "../pages/Home";
import VisPerfs from "../pages/VisPerfs";
import Loading from "../components/loadings/Loading";
import Evento from "../pages/Evento";
import Recuperar from "../pages/recuperar/Recuperar";
import NewPassword from "../pages/recuperar/NewPassword";

function AppRouter() {
  return (
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
          <PrivateRoute>
            <SignNegocio />
          </PrivateRoute>
        } />
        <Route exact path={routes.newpatrocinador} element={
          <PrivateRoute>
            <SignPatrocinador />
          </PrivateRoute>
        } />
        <Route exact path={routes.newartista} element={
          <PrivateRoute>
            <SignArtista />
          </PrivateRoute>
        } />
        <Route exact path={routes.rolartista} element={
          <PrivateRoute Role={roles.artista}>
            <RolArtista />
          </PrivateRoute>
        } />
        <Route exact path={routes.registrarevento} element={
          <PrivateRoute>
            <RegistroEvento />
          </PrivateRoute>
        } />
        <Route exact path={routes.perfil} element={
          <PrivateRoute Role={"usuarios"}>
            <ConPerf />
          </PrivateRoute>
        } />
        <Route exact path={routes.recuperar} element={
          <PublicRoute>
            <Recuperar />
          </PublicRoute>
        } />
        <Route exact path={'/resetpassword/:id/:token'} element={
          <PublicRoute>
            <NewPassword />
          </PublicRoute>
        } />
        <Route exact path={'/visperfil/:id'} element={
            <VisPerfs />
        } />
        <Route path="/evento/:id" element={
          <Evento />
        }>

        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
