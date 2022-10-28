import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import "../stylesheets/signPatrocinador.css";
import routes from "../helpers/routes";

function SignPatrocinador() {
  const { user } = useAuth();
  const navigate = useNavigate()

  const [patrocinador, setPatrocinador] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "1",
    descripcion: "",
  });

  const handleChange = (e) => {
    setPatrocinador({
      ...patrocinador,
      [e.target.name]: e.target.value,
    });
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  const addPat = () => {
    console.log(patrocinador)
    instance.post('/cargos/patrocinador', { patrocinador, direccion: originRef.current.value, id: user.id })
    .then((registro) => {
      alert("Patrocinio registrado con éxito");
      navigate(routes.perfil)
    })
    .catch((err) => {
      console.log(err);
    })
  }

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

            <div className="PatcontInp">
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
          <h2>Forma de patrocinio</h2>
          <div className="PatcontT">
            <div className="PatcontTipPat">
              <fieldset>
                    <input type="radio" id="contactChoice1"
                    name="tipo" value={1} onClick={handleChange} defaultChecked="true" />
                    <label for="contactChoice1">Bebidas</label>
                    <br />
                    <input type="radio" id="contactChoice2"
                    name="tipo" value={2} onClick={handleChange}/>
                    <label for="contactChoice2">Alcohol</label>
                    <br />
                    <input type="radio" id="contactChoice3"
                    name="tipo" value={3} onClick={handleChange}/>
                    <label for="contactChoice3">Entretenimiento</label>
              </fieldset>
            </div>
            <div className="PatcontTDes">
              <h3>Descripcion</h3>
              <p></p>
              <textarea
                cols="30"
                rows="5"
                placeholder="Añada una descripsion de la forma y tipo de patrocinio que proporciona"
                onChange={handleChange}
                name="descripcion"
              />
            </div>
          </div>
          
          <div className="PatcontBot">
            <button
              className="boton1"
              onClick={() => addPat()}
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
