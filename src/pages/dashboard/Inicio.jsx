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
            <h3>Eventos</h3>
            <p>
              Administra tus eventos pasados, proximos y crea nuevos eventos.
            </p>
          </div>
        </Link>
        <Link to={'/dashboard/estadisticas'} >
          <div className="elemento">
            <h3>Estadisticas</h3>
            <p>
              Visualiza la popularidad de tus eventos, con estadisticas de 
              numero de comentarios, reacciones
              y asistentes.
            </p>
          </div>
        </Link>
        <Link to={'/dashboard/mensajes'} >
          <div className="elemento">
            <h3>Mensajes</h3>
            <p> 
              Conversa y negocia con tus clientes, proveedores y colaboradores.
            </p>
          </div>
        </Link>
        <Link to={'/dashboard/perfil'} >
          <div className="elemento">
            <h3>Perfil</h3>
            <p>
              Visualiza y edita tu perfil.
            </p>
          </div>
        </Link>
        <Link to={'/dashboard/configuracion'} >
          <div className="elemento">
            <h3>Configuracion</h3>
            <p>
              Configura tu cuenta.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;