import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Loading from "../components/Loading";
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
    try {
      islogin();
    } catch (error) {
      console.log('hola');       
    }
    return <Loading />;
  }


  return (
    <div className="contImagen">
      <Header>
        <Link to="/signup" className="boton3">
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
            </div>
            <h3>¿Olvidaste tu contraseña?</h3>
            <button
              className="boton1"
              onClick={() => login(userCredentials, location)}
            >
              Ingresar
            </button>
            <section className="separador">
              <div className="letra">Ó</div>
            </section>
            <button className="boton2">Otra Opción</button>
            <Link to="/signup" className="boton3">
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
