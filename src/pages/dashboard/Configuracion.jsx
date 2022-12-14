import React from "react";
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DatosNegocio from "./configs/DatosNegocio";

const Configuracion = () => {

  const location = useLocation();

  if (location.pathname === '/dashboard/configuracion') {
    <Navigate to={'/dashboard/configuracion/informacion'} state={{ from: location }} />;
  }

  return (
    <div className="contDashboardConfiguracion">

      <section className="sideBar">
        <div className="titulo">
          <h1>Configuración</h1>
        </div>
        <ul>
          <li>
            <NavLink to={'/dashboard/configuracion/informacion'} className={({ isActive, isPending }) => isActive ? "active" : ""} >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
                <polyline points="11 12 12 12 12 16 13 16" />
              </svg>
              Información del negocio
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/configuracion/usuarios'} className={({ isActive, isPending }) => isActive ? "active" : ""} >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-2" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="18" y2="6.01" />
                <path d="M18 13l-3.5 -5a4 4 0 1 1 7 0l-3.5 5" />
                <polyline points="10.5 4.75 9 4 3 7 3 20 9 17 15 20 21 17 21 15" />
                <line x1="9" y1="4" x2="9" y2="17" />
                <line x1="15" y1="15" x2="15" y2="20" />
              </svg>
              Direccion
            </NavLink>
          </li>
        </ul>

        <div className="buttons">
          <button>Cambiar a cuenta principal</button>
          <button>Cerrar sesión</button>
        </div>

      </section>

      <section className="contenido">
        <Routes>
          <Route path='informacion' element={<DatosNegocio />} />
        </Routes>
      </section>
    </div>
  );
}

export default Configuracion;