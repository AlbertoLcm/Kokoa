import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";
import perfil from '../images/Wall (59).jpg';

function Header({ tipo, user, back = false, children, toggle = true }) {
  const nav = useNavigate();
  const [opcio, setOpcio] = useState(false);
  const toggleOptions = () => { setOpcio(!opcio) };
  const { logout } = useAuth();

  return (
    <>
      <header id={tipo}>
        <section className="contLogo" onClick={() => nav(routes.home)}>
          <div className="logo">Kokoa</div>
        </section>
        <section className="userHeader">
          {children}
          {back ?
            <div className="btnBack" onClick={() => nav(-1)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </div>
            : null}
          {user ?
            <div className="user" onClick={() => toggleOptions(!opcio)}>
              <section className="contImgPerfil">
                <img src={perfil} alt="Perfil" />
              </section>

              <section className="contName">
                {user}
              </section>
            </div>
            : null}
        </section>
      </header>
      {opcio && (
        toggle ?
        <div className="acomodo">
          <div className="dropiOpcio">
            <Link to={routes.perfil} id="togglePerfil">Configuración del perfil</Link>
            <div onClick={() => logout()} id='toggleSalir'>Salir</div>
          </div>
        </div>
        : null
      )}
    </>
  );
}

export default Header;