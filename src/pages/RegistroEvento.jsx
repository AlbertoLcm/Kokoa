import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RegistroEvento.css";
import {
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import instance from "../api/axios";

function RegistroEvento() {

const [datosEvento, setDatosEvento] = useState({
    ubicacion: "",
});

const [coor, setCoor] = useState({
    lat: "",
    lng: ""
});

const handleChange = (e) => {
    setDatosEvento({
      ...datosEvento,
      [e.target.name]: e.target.value,
    });
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  async function handleSubmit() {
      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode(
        {
          address: originRef.current.value,
        },
        (results, status) => {
            setCoor({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              });
        }
      );

      console.log(coor)
      instance.post('eventos/add', {
        lat: coor.lat,
        lng: coor.lng
      })
      .then((results) => {
        alert(results.data.message)
      })
      .catch((error) => {
        alert(error.response.data.message);
    });
  }

  const nav = useNavigate();
  return (
    <div className="contBackground">
      <Header boton={"Crear Cuenta"}>
        {" "}
        <div className="regEvBotVolverPc">
          <button className="boton1" onClick={() => nav(-1)}>
            Volver
          </button>
        </div>{" "}
      </Header>
      <div className="regEvContForm">
        <div className="Organz">
          <div action="" className="regEvForm">
            <div className="regEvContCabeza">
              <h1>REGISTRAR NUEVO EVENTO</h1>
            </div>
            <div className="regEvdataTotal">
              <div className="regEvContInp">
                <Autocomplete>
                  <div className="inputBox">
                    <input
                      id="ubicacion"
                      name="ubicacion"
                      type="text"
                      onChange={handleChange}
                      value={datosEvento.ubicacion}
                      ref={originRef}
                      required
                    />
                    <span>Ubicación del evento</span>
                  </div>
                </Autocomplete>
              </div>
            </div>

            <div className="regEvContInp">
              <h2>Fecha de inicio</h2>
              <Input type="date" />

              <h2>Hora de inicio</h2>
              <Input type="Time" />

              <h2>Costo del acceso</h2>
              <h3>(Dejar en blanco en caso de ser gratuito)</h3>
              <Input type="number" />

              <h2>Capacidad del evento</h2>
              <h3>
                (Dejar en blanco en caso de no tener limite o ser variable)
              </h3>
              <Input type="number" />

              <div className="regEvContPub">
                <h2>Publico</h2> <input type="checkbox" defaultChecked={true} />
              </div>
            </div>
            <div className="regEvContBot">
              <button className="boton1" onClick={() => handleSubmit()}>
                Registrar Evento
              </button>
            </div>
          </div>
        </div>
        <div className="regEvBotVolverChic">
          <button className="boton1" onClick={() => nav(-1)}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistroEvento;
