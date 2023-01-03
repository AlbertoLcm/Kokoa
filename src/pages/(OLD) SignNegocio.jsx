import React, { useRef, useState } from "react";
import Header from "../components/Header";
import useAuth from "../auth/useAuth";
import "../stylesheets/signNegocio.css";
import instance from "../api/axios";
import { Autocomplete } from "@react-google-maps/api";
import routes from "../helpers/routes";
import {useNavigate} from "react-router-dom";

function SignNegocio() {
  const { user } = useAuth();
  const navigate = useNavigate();


  const [negocio, setNegocio] = useState({
    nombre: "",
    email: "",
    telefono: "",
    descripcion: "",
    Lun1: "",
    Lun2: "",
    Mar1: "",
    Mar2: "",
    Mie1: "",
    Mie2: "",
    Jue1: "",
    Jue2: "",
    Vie1: "",
    Vie2: "",
    Sab1: "",
    Sab2: "",
    Dom1: "",
    Dom2: ""
  });

  const addNeg = () => {
    instance.post('/cargos/negocio', { negocio, direccion: originRef.current.value, id: user.id })
      .then((registro) => {
        alert("Negocio registrado con éxito");
        navigate(routes.perfil)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleChange = (e) => {
    setNegocio({
      ...negocio,
      [e.target.name]: e.target.value,
    });
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  return (
    <div className="negContBackground">
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />

      <div className="NegcontForm">
        <div action="" className="Negform">
          <div className="NegcontCabeza">
            <h1>REGISTRAR NUEVO NEGOCIO</h1>
          </div>
          <div className="NegdataTotal">
            <div className="NegcontInp">
              <h2>DATOS DE CONTACTO</h2>
              <div className="inputBox">
                <input
                  autoComplete="off"
                  name="nombre"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Nombre de su negocio</span>
              </div>
              <div className="inputBox">
                <input
                  autoComplete="off"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Email para su negocio</span>
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

            <div className="NegcontInp">
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
          <h2>Horario</h2>
          <div className="NegcontHorario">
            <div>
              <h2>Lunes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Lun1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Lun2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Martes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Mar1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Mar2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Miercoles</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Mie1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Mie2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Jueves</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Jue1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Jue2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Viernes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Vie1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Vie2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Sabado</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Sab1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Sab2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2>Domigo</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2>
                <div className="inputBox">
                  <input
                    name="Dom1"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
                <h2 className="NegtextHor"> a: </h2>
                <div className="inputBox">
                  <input
                    name="Dom2"
                    onChange={handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="negContTextAr">
          <h3>Descripcion</h3>
              <p></p>
              <textarea
                cols="50"
                rows="5"
                maxlength="150"
                placeholder="Añada una descripsion de su negocio"
                onChange={handleChange}
                name="descripcion"
              />
          </div>
          <div className="NegcontBot">
            <button className="boton1" onClick={() => addNeg()}>Registrarse</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignNegocio;
