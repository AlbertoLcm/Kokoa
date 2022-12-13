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
          <NavLink to="/dashboard/inicio" className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}  >Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/eventos" >Eventos</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/estadisticas" >Estadisticas</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/mensajes" >Mensajes</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/perfil" >Perfil</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/configuracion" >Configuración</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;