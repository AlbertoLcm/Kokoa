import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../stylesheets/pages/Dashboard.css";

const Sidebar = () => {

  const { user } = useAuth();

  return (
    <div id="Sidebar">
      <section className="logo">
        <h1>{user.nombre_cargo}</h1>
      </section>

      <ul>
        <li>
          <NavLink to="/dashboard/inicio" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}  >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="5 12 3 12 12 3 21 12 19 12" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <rect x="10" y="12" width="4" height="4" />
            </svg>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/eventos" >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ticket" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="15" y1="5" x2="15" y2="7" />
              <line x1="15" y1="11" x2="15" y2="13" />
              <line x1="15" y1="17" x2="15" y2="19" />
              <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
            </svg>
            Eventos
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/estadisticas" >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-desktop-analytics" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="4" width="18" height="12" rx="1" />
              <path d="M7 20h10" />
              <path d="M9 16v4" />
              <path d="M15 16v4" />
              <path d="M9 12v-4" />
              <path d="M12 12v-1" />
              <path d="M15 12v-2" />
              <path d="M12 12v-1" />
            </svg>
            Estadisticas
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mensajes" >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle-2" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
              <line x1="12" y1="12" x2="12" y2="12.01" />
              <line x1="8" y1="12" x2="8" y2="12.01" />
              <line x1="16" y1="12" x2="16" y2="12.01" />
            </svg>
            Mensajes
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/perfil" >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-circle" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="10" r="3" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>
            Perfil
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/configuracion" >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3bd" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Configuración
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;