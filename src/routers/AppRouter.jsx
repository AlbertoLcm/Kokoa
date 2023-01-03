import React from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "../pages/Sign";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../pages/profile/Profile"
import Error from "../pages/404";
import routes from "../helpers/routes";
import Login from "../pages/Login";
import Home from "../pages/home/Home";
import Perfil from "../pages/Perfil";
import Evento from "../pages/Evento";
import Recuperar from "../pages/recuperar/Recuperar";
import NewPassword from "../pages/recuperar/NewPassword";
import DashBoard from "../pages/dashboard/DashBoard";

function AppRouter() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path={'/*'} element={
          <PrivateRoute >
            <Home />
          </PrivateRoute>
        } />
        <Route exact path={routes.login} element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route exact path={routes.newusuario} element={
          <PublicRoute>
            <Sign />
          </PublicRoute>
        } />
        <Route exact path={'/dashboard/*'} element={
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        } />
        <Route exact path={'perfil/*'} element={
          <PrivateRoute>
            <Profile />
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
        <Route exact path={'/negocio/:nombre/:id'} element={
            <Perfil />
        } />
        <Route path="/evento/:nombre/:id" element={
          <Evento />
        }>
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default AppRouter;
