import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../stylesheets/signPatrocinador.css";

function SignPatrocinador() {
  const { signup, user } = useAuth();
  const location = useLocation();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    tipo_artista: "",
    descripcion: "",
    password: "",
    rol: "patrocinadores",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const nav = useNavigate();
  return (
    <div className="contBackground">
      <Header tipo={'responsive'} user={user.nombre} back={true} />

      <div className="PatcontForm">
        <div action="" className="Patform">
          {" "}
          {/* este es el form */}
          <div className="PatcontCabeza">
            <h1>REGISTRAR NUEVO PATROCINADOR</h1>
          </div>
          <div className="PatdataTotal">
            <div className="PatcontInp">
              <h2>DATOS DE CONTACTO</h2>
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
                  type="number"
                  required
                />
                <span>Numero de contacto</span>
              </div>
            </div>

            {/* <div className="PatcontInp">
              <h2>DIRECCION</h2>
              <Input type="text" className="PatdataUser">
                ESTADO
              </Input>
              <Input type="text" className="PatdataUser">
                COLONIA
              </Input>
              <Input type="text" className="PatdataUser">
                CALLE
              </Input>
              <Input type="text" className="PatdataUser">
                NUMERO
              </Input>
            </div> */}

          </div>
          <h2>Forma de patrocinio</h2>
          <div className="PatcontT">
            <div className="PatcontTipPat">
              <h3>Tipo de Patrocinio</h3>
              <p>Bebidas</p> <Input type="checkbox" />
              <p>Alcohol</p>
              <Input type="checkbox" />
              <p>Entretenimiento</p>
              <Input type="checkbox" />
            </div>
            <div className="PatcontTDes">
              <h3>Descripcion</h3>
              <p></p>
              <textarea
                cols="30"
                rows="5"
                placeholder="Añada una descripsion de la forma y tipo de patrocinio que proporciona"
              />
            </div>
          </div>
          
          <div className="PatcontBot">
            <button
              className="boton1"
              onClick={() => signup(usuario, "patrocinadores", location)}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPatrocinador;
