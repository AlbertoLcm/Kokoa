import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";
import fotoPerfil from '../images/Wall (59).jpg';
import instance from "../api/axios";

function Header({ tipo, perfil, back = false, children, toggle = true, name = false }) {
  const nav = useNavigate();
  const [opcio, setOpcio] = useState(false);
  const { user, actionBackLogin } = useAuth();
  const toggleOptions = () => { setOpcio(!opcio) };
  const { logout } = useAuth();

  const actionCambiarCuenta = () => {
    setOpcio(false);
    actionBackLogin();
  };

  return (
    <>
      <header id={tipo}>
        <section className="contLogo" onClick={() => nav(routes.home)}>
          <div className="logo">Kokoa</div>
        </section>
        <section className="userHeader">
          {children}

          {perfil ?
            <div className="user" onClick={() => toggleOptions(!opcio)}>
              <section className="contImgPerfil">
                <img src={user.perfil} alt="Perfil" />
              </section>

              {name ?
                <section className="contName">
                  {user.nombre}
                </section>
                : null}
            </div>
            : null}

        </section>
      </header>
      {opcio && (
        toggle ?
          <div className="acomodo">
            <div className="dropiOpcio">
              <section className="perfiles">
                {user.nombre}
              </section>
              <section className="contOptions">
                {user.rol !== "usuarios" ? (
                  <div onClick={() => actionCambiarCuenta()} className="option">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                      <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                    </svg>
                    <label>Cuenta principal</label>
                  </div>
                ) : (null)}

                {user.rol === "usuarios" ? (
                  <Link to={routes.perfil} className="option">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <label>Configuración del perfil</label>
                  </Link>
                ) : (null)}
                <div onClick={() => logout()} className="option">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 12h14l-3 -3m0 6l3 -3" />
                  </svg>
                  <label>Salir</label>
                </div>
              </section>
            </div>
          </div>
          : null
      )}
    </>
  );
}

export default Header;