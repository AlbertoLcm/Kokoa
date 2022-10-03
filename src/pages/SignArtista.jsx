import React, { useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../stylesheets/signArtista.css";


function SignArtista() {
  const { signup } = useAuth();
  const location = useLocation();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    tipo_artista: "",
    descripcion: "",
    password: "",
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
      <Header boton={"Crear Cuenta"}>
        <div className="ArtbotVolver">
          <button className="boton1" onClick={() => nav(-1)}>
            Volver
          </button>
        </div>{" "}
      </Header>
      <div className="ArtcontForm">
        <div action="" className="Artform">
          {" "}
          {/* Este es el form */}
          <div className="ArtbotVolverChica">
            <button className="boton1" onClick={() => nav(-1)}>
              Volver
            </button>
          </div>
          <div className="ArtcontCabeza">
            <h1>REGISTRO COMO ARTISTA</h1>
          </div>
          <div className="ArtdataTotal">
            <div className="ArtcontInp">
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

            <div className="ArtcontInp">
              <h2>DIRECCION</h2>
              <Input type="text" className="ArtdataUser">
                ESTADO
              </Input>
              <Input type="text" className="ArtdataUser">
                COLONIA
              </Input>
              <Input type="text" className="ArtdataUser">
                CALLE
              </Input>
              <Input type="text" className="ArtdataUser">
                NUMERO
              </Input>
            </div>
          </div>
          <h2>PERFORMANCE</h2>
          <div className="ArtcontT">
            <div className="ArtcontTipPat">
              <h3>Tipo Performance</h3>
              <p>Musica</p> <Input type="checkbox" />
              <p>Entretenimiento</p>
              <Input type="checkbox" />
            </div>
            <div className="ArtcontTDes">
              <h3>Descripcion</h3>
              <p></p>
              <textarea
                cols="30"
                rows="5"
                placeholder="Añada una descripsion de su acto/estilo musical "
              />
            </div>
          </div>
          <h2>Contraseña</h2>
          <div className="ArtcontPass">
            <div className="ArtdataPass">
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
            <div className="ArtdataPass">
              <Input type="password">Confirme su Contraseña</Input>
            </div>
          </div>
          <div className="ArtcontBot">
            <button
              className="boton1"
              onClick={() => signup(usuario, "artistas", location)}
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignArtista;
