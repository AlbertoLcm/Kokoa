import React, { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import { Link } from "react-router-dom";
import "../stylesheets/Home.css";
import "../stylesheets/BurguerMenu.css";
import routes from "../helpers/routes";
import Mapa from "../components/Mapa";
import Dropdown from "../components/DropDown";
import instance from "../api/axios";

function Home() {
  
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
      </header>

      <div className="hoContMapa">
        <div id="contBackgroundHome">
          <div id="contFeed">
            <div id="feedHome">
              {/* <Dropdown  title="Select" items={items1}/> 
              <frame /> */}
              <h1>Datos</h1>
              <hr />
              <p>
                Información relacionada con los tipos de eventos dentro de la
                zona del usuario
              </p>
              <Link to={routes.registrarevento} className="boton3">
                {" "}
                Crear Evento{" "}
              </Link>
            </div>
          </div>
        </div>
        <Mapa />
      </div>
    </div>
  );
}

export default Home;
