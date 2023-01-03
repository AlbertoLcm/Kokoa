import React from "react";
import { NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Cuentas from "./perfiles/Cuentas";

const Perfiles = () => {

  const navigation = useNavigate();
  const location = useLocation();

  return (
    <div className="contPerfilesProfile">
      <section className="sidebar">
        <div className="titulo">
          <h1>Perfiles</h1>
        </div>
        <ul>
          <li>
            <NavLink to={'/perfil/perfiles/cuentas'} className={({ isActive, isPending }) => isActive ? "active" : ""} >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-analytics" width="25" height="25" viewBox="0 0 25 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x="3" y="4" width="18" height="12" rx="1" />
                <line x1="7" y1="20" x2="17" y2="20" />
                <line x1="9" y1="16" x2="9" y2="20" />
                <line x1="15" y1="16" x2="15" y2="20" />
                <path d="M8 12l3 -3l2 2l3 -3" />
              </svg>
              Tus cuentas
            </NavLink>
          </li>
        </ul>

        <div className="buttons">
          <button className="addCount" onClick={() => navigation(`${location.pathname}/crear`)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="12" y1="9" x2="12" y2="15" />
            </svg>
            Crear una cuenta
          </button>
        </div>

      </section>

      <section className="contenido">
        <Routes>
          <Route path="cuentas/*" element={<Cuentas />} />
        </Routes>
      </section>
    </div>
  );
}

export default Perfiles;