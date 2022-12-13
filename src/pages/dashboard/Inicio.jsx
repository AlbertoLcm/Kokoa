import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "../../stylesheets/pages/Dashboard.css";

const Inicio = () => {

  const { user } = useAuth();
  
  return (
    <div className="contDashboardInicio">
      <section className="titulo">
        <h1>{user.nombre_cargo}</h1>
      </section>
      <div className="datos">
        <Link to={'/dashboard/eventos'} >
          <div className="elemento">
            Eventos
          </div>
        </Link>
        <Link to={'/dashboard/estadisticas'} >
          <div className="elemento">
            Estadisticas
          </div>
        </Link>
        <Link to={'/dashboard/mensajes'} >
          <div className="elemento">
            Mensajes
          </div>
        </Link>
        <Link to={'/dashboard/perfil'} >
          <div className="elemento">
            Perfil
          </div>
        </Link>
        <Link to={'/dashboard/configuracion'} >
          <div className="elemento">
            Configuracion
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;