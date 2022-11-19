import React, { useRef } from "react";
import "../stylesheets/Buttons.css";
import Header from "../components/Header";
import "../stylesheets/SignUsuario.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

function SignUsuario() {
  const { signup } = useAuth();
  const location = useLocation();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();

  console.log(location);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contBackground">
      <Header>
        <Link to={routes.login} state={{from: location.state?.from, pagina: location.state?.pagina}} className="btnLink">
          Iniciar Sesión
        </Link>
      </Header>
      <div className="UscontTot">
        <div className="UscontForm">
          <div className="form">
            <div className="UsbotVolverChic">
              <button className="boton1"
                onClick={
                  () => nav(-1)
                }>
                Volver
              </button>
            </div>
            <div className="UscontCabeza">
              <h2>Crear cuenta nueva.</h2>
            </div>
              <div ref={alertRef} className="alert d-none">
                Mensaje alert
              </div>
            <div className="contInpUs">
              <div className="inputBox">
                <input name="nombre"
                  onChange={handleChange}
                  type="text"
                  required />
                <span>Nombre</span>
              </div>
              <div className="inputBox">
                <input name="apellidos"
                  onChange={handleChange}
                  type="text"
                  required />
                <span>Apellidos</span>
              </div>
              <div className="inputBox">
                <input name="email"
                  onChange={handleChange}
                  type="text"
                  required />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <input name="telefono"
                  onChange={handleChange}
                  type="text"
                  required />
                <span>Número de teléfono</span>
              </div>
            </div>
            <div className="contPass">
              <div className="inputBox">
                <input name="password"
                  onChange={handleChange}
                  type="password"
                  required />
                <span>Contraseña</span>
              </div>
            </div>
            <button className="boton1"
              onClick={() => signup(usuario, location.state, alertRef)}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUsuario;
