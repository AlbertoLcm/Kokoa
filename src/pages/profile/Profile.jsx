import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import Header from "../../components/Header";
import Información from "./Informacion";
import Perfiles from "./Perfiles";
import "../../stylesheets/pages/Profile.css";

const Profile = () => {

  const { logout, user } = useAuth();

  return (
    <>
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />

      <div id="ContGeneralProfile">
        <section className="sidebarProfile">
          <section className="logo">
            <h1>Tú cuenta</h1>
          </section>
          <ul>
            <li>
              <NavLink to="/perfil/informacion" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}  >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                </svg>
                Información
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil/perfiles/cuentas" >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                  <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                </svg>
                Perfiles
              </NavLink>
            </li>
          </ul>

          <div className="buttons">
            <button className="btnLogout" onClick={() => logout()}>Cerrar sesión</button>
          </div>
        </section>

        <section className="contenedor">
          <Routes>
            <Route path="informacion" element={<Información />} />
            <Route path="perfiles/*" element={<Perfiles />} />
          </Routes>
        </section>
      </div>
    </>
  );
};

export default Profile;