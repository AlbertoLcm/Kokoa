import React from "react";
import useAuth from "../auth/useAuth";
import { useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";
import Dropdown from "../components/DropDown";
import Evento from "../components/EventosPagPrin";
import RegistroEvento from "./RegistroEvento";

const items1 = [
  {
    id: 1,
    value: "Crear nuevo evento",
  },
  {
    id: 2,
    value: "Eventos Cercanos",
  },
  {
    id: 3,
    value: "Eventos Recomendados",
  },
];

const cordsimp = {
  lat: 16.946323,
  lng: 120.831226,
};

function Home() {
  const { marcar, eventos } = useAuth();

  const { logout, user } = useAuth();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  const handleSetEventos = (event) => {
    eventos = event;
  }

  return (
    <div className="contHome">
      <header className="color">
        <section className="contLogo">
          <div className="logo">Kokoa</div>
        </section>
        <ul className="contBotones">
          <li>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              {user.nombre}{" "}
            </a>
            <ul className="nav" aria-labelledby="navbarDropdown">
              <li>
                <a href="#">Acción</a>
              </li>
              <li>
                <a href="#">Otra acción</a>
              </li>
              <li>
                <a onClick={() => logout()}>salir</a>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <Menu>
        <h2>Hola {user.nombre}</h2>
        {window.screen.width <= 768 ? (
          <Dropdown title="Evento" items={items1} />
        ) : (
          <h1>Recarga la pagina por favor</h1>
        )}
        {marcar === 1 ? (
          <div className="CrearEvento">
            <RegistroEvento />
          </div>
        ) : marcar === 2 ? (
          <div className="Cercanos">
            <Evento titulo={"Monte Clitoris"} corrs={cordsimp} mapa={map} />
            {eventos.map((evento) => {
              return (
                <Evento
                  lugar={evento.ubicacion}
                  titulo={evento.evento}
                  corrs={{ lat: evento.lat, lng: evento.lng }}
                  mapa={map}
                />
              )
            })}
          </div>
        ) : (
          <div className="Recomendados">
            <p>Cont1</p>
            <button className="boton1" onClick={() => logout()}>
              Cerrar Sesion
            </button>
          </div>
        )}
      </Menu>
      <div className="hoContMapa">
        <div id="contBackgroundHome">
          <div id="contFeed">
            <div id="feedHome">
              <h2>Hola {user.nombre}</h2>
              <Dropdown title="Evento" items={items1} />
              {marcar === 1 ? (
                <div className="CrearEvento">
                  <RegistroEvento />
                </div>
              ) : marcar === 2 ? (
                <div className="Cercanos">
                  {eventos.map((evento) => {
                    return (
                      <Evento
                        lugar={evento.ubicacion}
                        titulo={evento.evento}
                        corrs={{ lat: evento.lat, lng: evento.lng }}
                        mapa={map}
                      />
                    )
                  })}

                  <button className="boton1" onClick={() => logout()}>
                    Cerrar Sesion
                  </button>
                </div>
              ) : (
                <div className="Recomendados">
                  <p>Cont1</p>
                  <button className="boton1" onClick={() => logout()}>
                    Cerrar Sesion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Mapa mapSet={handleSetMap} />
      </div>
    </div>
  );
}

export default Home;
