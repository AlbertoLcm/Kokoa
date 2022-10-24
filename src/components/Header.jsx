import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import icon from '../images/iconRetroceso.png'
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";

function Header({ tipo, user, back, children }) {
  const nav = useNavigate();
  const [opcio, setOpcio] = useState(false);
  const toggle = () => { setOpcio(!opcio) };
  const { logout } = useAuth();
  
  return (
    <>
      <header className={tipo}>
        <section className="contLogo" onClick={() => nav(routes.home)}>
          <div className="logo">Kokoa</div>
        </section>
        <section className="userHeader">
        {children}
        {back?
          <div className="btnBack" onClick={() => nav(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="9" y2="16" />
              <line x1="5" y1="12" x2="9" y2="8" />
            </svg>
          </div>
        : null}
        <div className="user" onClick={() => toggle(!opcio)}>
          {user}
        </div>
        </section>
      </header>
      {opcio && (
          <div className="acomodo">
            <div className="dropiOpcio">
              <Link to={routes.perfil} id="togglePerfil">Configuración del perfil</Link>
              <div onClick={() => logout()} id='toggleSalir'>Salir</div>
            </div>
          </div>
        )}
    </>
  );
}

export default Header;