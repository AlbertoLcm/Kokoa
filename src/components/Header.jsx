import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";

function Header({ tipo, perfil, back = false, children, toggle = true }) {
  const nav = useNavigate();

  const toggleRef = useRef();

  const [opcio, setOpcio] = useState(false);
  const { user, actionBackLogin } = useAuth();
  const toggleOptions = () => { setOpcio(!opcio) };
  const { logout } = useAuth();

  const actionCambiarCuenta = () => {
    setOpcio(false);
    actionBackLogin();
  };

  // Si da click fuera del toggle, se desactiva
  useEffect(() => {
    const handleClick = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setOpcio(false);
      }
    };
    document.addEventListener("click", handleClick);
  }, [toggleRef]);

  return (
    <>
      <header id={tipo}>
        <section className="contLogo" onClick={() => nav(routes.home)}>
          <div className="logo">
            <div className="contImg">
              <img src={require('../images/logo.png')} alt="" /></div>
          </div>
        </section>
        <section className="userHeader">

          <div className="children">
            {children}
          </div>

          {perfil ?
            <div className="user" onClick={() => toggleOptions(!opcio)} ref={toggleRef}>
              <section className="contImgPerfil">
                <img src={user.perfil} alt="Perfil" />
              </section>

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
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                            <label>Cuenta principal</label>
                          </div>
                        ) : (null)}

                        {user.rol === "usuarios" ? (
                          <Link to={'/perfil/informacion'} className="option">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            <label>Configuración del perfil</label>
                          </Link>
                        ) : (null)}
                        <div onClick={() => logout()} className="option">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
            </div>
            : null}

        </section>
      </header>
    </>
  );
}

export default Header;