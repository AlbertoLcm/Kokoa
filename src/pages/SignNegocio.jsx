import React, { useRef, useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../stylesheets/signNegocio.css";
import instance from "../api/axios";
import { Autocomplete } from "@react-google-maps/api";

function SignNegocio() {
  const { signup, user } = useAuth();
  const location = useLocation();

  const [negocio, setNegocio] = useState({
    nombre: "",
    email: "",
    telefono: "",
    lun1: "",
    lun2: "",
    mar1: "",
    mar2: "",
    mie1: "",
    mie2: "",
    jue1: "",
    jue2: "",
    vie1: "",
    vie2: "",
    sab1: "",
    sab2: "",
    dom1: "",
    dom2: ""
  });

  const addNeg = () => {
    console.log(negocio)
    instance.post('/cargos/negocio', {negocio: negocio, direccion: originRef, id: user[0].id})
    .then((registro) => {
      console.log(registro);
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

  const nav = useNavigate();
  return (
    <div className="contBackground">
      <Header tipo={'responsive'} user={user[0].nombre} back={true} />

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
                  name="nombre"
                  onChange={handleChange}
                  type="text"
                  required
                />
                <span>Nombre de su negocio</span>
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

            <div className="NegcontInp">
              <h2>DIRECCION</h2>
              <Autocomplete>
              <div className="inputBox">
                <input
                  id="ubicacion"
                  name="direccion"
                  type="text"
                  onChange={handleChange}
                  ref={originRef}
                  required
                />
                {/* <span>Ubicación del evento</span> */}
              </div>
            </Autocomplete>
            </div>
          </div>
          <h2>Horario</h2>
          <div className="NegcontHorario">
            <div>
              <h2>Lunes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="lun1" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="lun2"/>
              </div>
            </div>
            <div>
              <h2>Martes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="mar1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="mar2"/>
              </div>
            </div>
            <div>
              <h2>Miercoles</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="mie1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="mie2"/>
              </div>
            </div>
            <div>
              <h2>Jueves</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="jue1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="jue2"/>
              </div>
            </div>
            <div>
              <h2>Viernes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="vie1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="vie2"/>
              </div>
            </div>
            <div>
              <h2>Sabado</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="sab1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="sab2"/>
              </div>
            </div>
            <div>
              <h2>Domigo</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" onChange={handleChange} name="dom1"/>{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" onChange={handleChange} name="dom2"/>
              </div>
            </div>
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
