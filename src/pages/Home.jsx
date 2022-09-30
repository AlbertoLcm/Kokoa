import React, { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import { slide as Menu } from 'react-burger-menu'
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";
import Dropdown from "../components/DropDown";
import instance from "../api/axios";

const items1 = [
  {
    id: 1,
    value: 'Crear Evento'
  },
  {
    id: 2,
    value: 'Eventos Cercanos'
  },
  {
    id: 3,
    value: 'Eventos Recomendados'
  }
]

function Home() {
  const { marcar } = useAuth()
  const { logout, user } = useAuth();

  return (
    <div className="contHome">
      <header className="color">
        <section className="contLogo">
          <div className="logo">Kokoa</div>
        </section>
        <ul className="contBotones">
          <li>
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              {user.nombre}{" "}
            </a>
            <ul class="nav" aria-labelledby="navbarDropdown">
              <li>
                <a href="#">Acción</a>
              </li>
              <li>
                <a href="#">Otra acción</a>
              </li>
              <li>
                <a role="button" onClick={() => logout()}>
                  salir
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <a className="CerrarSesionChi" role="button" onClick={() => logout()}>
                  salir
                </a>
      </header>
      <Menu>
        <h2>Hola {user.nombre}</h2>
        <Dropdown title="Evento" items={items1} />
        {
          marcar == 1 ? (
            <div className="CrearEvento">
              <p>Cont3</p>
            </div>
          ) : (marcar == 2 ? (
            <div className="Cercanos">
              <p>Cont2</p>
            </div>
          ) : (
            <div className="Recomendados">
              <p>Cont1</p>
            </div>
          ))
        }
      </Menu>
      <div className="hoContMapa">
        <div id="contBackgroundHome">
          <div id="contFeed">
            <div id="feedHome">
              <h2>Hola {user.nombre}</h2>
              <Dropdown title="Evento" items={items1} />
              {
                marcar == 1 ? (
                  <div className="CrearEvento">
                    <p>Cont3</p>
                  </div>
                ) : (marcar == 2 ? (
                  <div className="Cercanos">
                    <p>Cont2</p>
                  </div>
                ) : (
                  <div className="Recomendados">
                    <p>Cont1</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Mapa />
      </div>
    </div>
  );
}

export default Home;
