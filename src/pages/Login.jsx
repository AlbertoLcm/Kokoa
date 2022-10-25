import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Loading from "../components/Loading";
import routes from "../helpers/routes";
import "../stylesheets/Login.css";

function Login() {
  const { login, islogin, user } = useAuth();
  const location = useLocation();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  if (localStorage.getItem("token")) {

    islogin();
    return <Loading />;
  } else {
    <Navigate to={routes.login} />
  }


  return (
    <div className="contImagen">
      <Header>
        <Link to={routes.newusuario} className="btnLink">
          Crear Cuenta
        </Link>
      </Header>
      <div className="contDegradado">
        <div className="contLogin">
          <div className="login">
            <h2>Bienvenido</h2>
            <div className="inputBox">
              <input
                id="email"
                name="email"
                type="text"
                onChange={handleChange}
                value={userCredentials.email}
                required
              />
              <span>Email o Teléfono</span>
              <div className="iconsLogin">
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg> */}
              </div>
            </div>
            <div className="inputBox">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={userCredentials.password}
                required
              />
              <span>Contraseña</span>
              <div className="iconsLogin">
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                </svg> */}
              </div>
            </div>
            <h3>¿Olvidaste tu contraseña?</h3>
            <button
              className="boton1"
              onClick={() => login(userCredentials, location)}
            >
              Ingresar
            </button>
            {/* <section className="separador">
              <div className="letra">Ó</div>
            </section>
            <button className="boton2">Otra Opción</button>
            <Link to="/signup" className="boton3">
              Crear Cuenta
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
