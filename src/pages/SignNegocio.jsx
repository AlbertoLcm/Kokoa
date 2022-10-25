import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../stylesheets/signNegocio.css";

function SignNegocio() {
  const { signup, user } = useAuth();
  const location = useLocation();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    horario: "",
    password: "",
    rol: "negocios"
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
      <Header tipo={'responsive'} user={user[0].nombre} volver={true} />

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
              <Input type="text" className="NegdataUser">
                ESTADO
              </Input>
              <Input type="text" className="NegdataUser">
                COLONIA
              </Input>
              <Input type="text" className="NegdataUser">
                CALLE
              </Input>
              <Input type="text" className="NegdataUser">
                NUMERO
              </Input>
            </div>
          </div>
          <h2>Horario</h2>
          <div className="NegcontHorario">
            <div>
              <h2>Lunes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Martes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Miercoles</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Jueves</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Viernes</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Sabado</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
            <div>
              <h2>Domigo</h2>
              <div className="NegcontHorDia">
                <h2 className="NegtextHor">De: </h2> <Input type="time" />{" "}
                <h2 className="NegtextHor"> a: </h2> <Input type="time" />
              </div>
            </div>
          </div> 

          <div className="NegcontBot">
            <button className="boton1" >Registrarse</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignNegocio;
