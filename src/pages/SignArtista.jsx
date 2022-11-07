import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import useAuth from "../auth/useAuth";
import "../stylesheets/signArtista.css";
import { Autocomplete } from "@react-google-maps/api";
import instance from "../api/axios";
import {useNavigate} from "react-router-dom";
import routes from "../helpers/routes";

function SignArtista() {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [artista, setArtista] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: 1,
    descripcion: "",
  });

  const addArt = () => {
    // console.log(artista)
    instance.post('/cargos/artista', { artista, direccion: originRef.current.value, id: user.id })
    .then((registro) => {
      alert("Entretenimiento registrado con éxito");
      navigate(routes.perfil)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleChange = (e) => {
    setArtista({
      ...artista,
      [e.target.name]: e.target.value,
    });
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  
  return (
    <div className="artContBackground">
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />

      <div className="ArtcontForm">
        <div action="" className="Artform">
          {" "}
          {/* Este es el form */}
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
                <span>Nombre Artistico</span>
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
              <Autocomplete>
                <div className="inputBox">
                  <input
                    id="ubicacion"
                    name="direccion"
                    type="text"
                    ref={originRef}
                    required
                  />
                </div>
              </Autocomplete>
            </div>
          </div>
          <h2>PERFORMANCE</h2>
          <div className="ArtcontT">
            <div className="ArtcontTipPat">
            <select name="tipo" onChange={handleChange} className="tipSelect">
              <option value="1">Musica</option>
              <option value="2">Entretenimiento</option>
            </select>
            </div>
            <div className="artContTextAr">
              <h3>Descripcion</h3>
              <p></p>
              <textarea
                cols="50"
                rows="5"
                maxlength="150"
                placeholder="Añada una descripcion de su acto/estilo musical "
                onChange={handleChange}
                name="descripcion"
              />
            </div>
          </div>
          
          <div className="ArtcontBot">
            <button
              className="boton1"
              onClick={() => addArt()}
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
