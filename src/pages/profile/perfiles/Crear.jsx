import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Artista from "./crear/Artista";
import Negocio from "./crear/Negocio";
import Patrocinio from "./crear/Patrocinador";

const Crear = () => {

  const navigation = useNavigate();

  const Menu = () => {
    return (
      <section className="contMenu">
        <div className="tituloMenu">
          <h1>Crear una cuenta.</h1>
          <h2>¿Qué tipo de cuenta quieres crear?</h2>
        </div>

        <section className="tarjetasCuentas">
          <Link to={'negocio'}>
            <div className="tarjetaCuenta">

              <section className="imagen">
                <div className="titulo">
                  <h3>¿Tienes un negocio?</h3>
                </div>
              </section>

              <div className="descripcion">
                <p>
                  ¿Tienes un pequeño bar, restaurante o cualquier
                  otro negocio?. Puedes promocionarlo creando una
                  cuenta de este tipo.
                </p>
              </div>
            </div>
          </Link>

          <Link to={'patrocinio'}>
            <div className="tarjetaCuenta">

              <section className="imagen patrocinio">
                <div className="titulo">
                  <h3>¿Eres patrocinador?</h3>
                </div>
              </section>

              <div className="descripcion">
                <p>
                  ¿Deseas promocionar tu marca con grandes
                  negocios?, puedes crear una cuenta de tipo
                  patrocinador y participar en eventos.
                </p>
              </div>
            </div>
          </Link>

          <Link to={'artista'}>
            <div className="tarjetaCuenta">

              <section className="imagen artista">
                <div className="titulo">
                  <h3>¿Eres un artista?</h3>
                </div>
              </section>

              <div className="descripcion">
                <p>
                  Si eres cantante, comediante, bailarín, etc.
                  y quieres promocionarte, puedes crear una cuenta
                  de tipo artista y participar en eventos.
                </p>
              </div>
            </div>
          </Link>
        </section>

      </section>
    );
  }

  return (
    <div className="contCrearProfile">
      <button onClick={() => navigation('/perfil/perfiles/cuentas')} className="btnExit">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="negocio" element={<Negocio />} />
        <Route path="patrocinio" element={<Patrocinio />} />
        <Route path="artista" element={<Artista />} />
      </Routes>
    </div>
  );
};

export default Crear;