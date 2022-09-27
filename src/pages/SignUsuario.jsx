import React from "react";
import "../stylesheets/Buttons.css";
import Header from "../components/Header";
import "../stylesheets/SignUsuario.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../auth/useAuth";

function SignUsuario() {
  const { signup } = useAuth();
  const location = useLocation();

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
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contBackground">
      <Header boton={"Crear Cuenta"} />
      <div className="UscontTot">
        <div className="UscontForm">
          <div className="form">
            <div className="UscontCabeza">
              <div className="UsbotVolver">
                <button className="boton1" onClick={() => nav(-1)}>
                  Volver
                </button>
              </div>
              <h1>REGISTRO COMO USUARIO</h1>
            </div>
            <div className="contInpUs">
              <div className="inputBox">
                <input
                  name="nombre"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Nombre</span>
              </div>
              <div className="inputBox">
                <input
                  name="apellidos"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Apellidos</span>
              </div>
              <div className="inputBox">
                <input
                  name="email"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <input
                  name="telefono"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Número de teléfono</span>
              </div>
            </div>
            <h2>Contraseña</h2>
            <div className="contPass">
              <div className="inputBox">
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                />
                <span>Contraseña</span>
              </div>
            </div>
            <div className="UscontBot"></div>
            <button
              className="boton1"
              onClick={() => signup(usuario, "usuarios", location)}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUsuario;
