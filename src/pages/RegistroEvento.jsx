import React, { useRef, useState } from "react";
import Header from "../components/Header";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RegistroEvento.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";

function RegistroEvento() {
  const nav = useNavigate();

  const { addMostrar, user } = useAuth();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });

  const [datosEvento, setDatosEvento] = useState({
    nombre: "",
    fechaInicio: "",
    horaInicio: "",
    fechaTermino: "",
    horaTermino: "",
  });

  const handleChange = (e) => {
    setDatosEvento({
      ...datosEvento,
      [e.target.name]: e.target.value,
    });
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

  if (!isLoaded) {
    return <div>fallo</div>;
  }

  function handleSubmit() {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: originRef.current.value,
      },
      (results, status) => {
        instance
          .post("eventos/add", {
            datosEvento,
            id: user[0].id,
            ubicacion: originRef.current.value,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          })
          .then((resultsBD) => {
            console.log(resultsBD);
            addMostrar(resultsBD)
            alert(resultsBD.data.message);
            nav(-1)
          })
          .catch((error) => {
            // console.log(error);
            alert(error.response.data.message);
          });
      }
    );
  }

  return (
    <div id="ContGeneralRegistrarEvento">
      <section className="closeRegistrarEvento" onClick={() => nav(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      </section>

      <div action="" className="registrarEventoForm">
        <h2>Crear evento nuevo.</h2>
        <div className="regEvdataTotal">
          <div className="regEvContInp">
            <Autocomplete>
              <div className="inputBox">
                <input
                  id="ubicacion"
                  name="ubicacion"
                  type="text"
                  onChange={handleChange}
                  ref={originRef}
                  required
                />
                {/* <span>Ubicación del evento</span> */}
              </div>
            </Autocomplete>
            <div className="inputBox">
              <input
                id="nombre"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={datosEvento.nombre}
                required
              />
              <span>Nombre del evento</span>
            </div>
          </div>
        </div>

        <div className="regEvContInp">
          <h2>Fecha de inicio</h2>
          <div className="inputBox">
            <input
              id="fechaInicio"
              name="fechaInicio"
              type="date"
              onChange={handleChange}
              value={datosEvento.fechaInicio}
              required
            />
            {/* <span>Ubicación del evento</span> */}
          </div>
          <h2>Hora de inicio</h2>
          <div className="inputBox">
            <input
              id="horaInicio"
              name="horaInicio"
              type="time"
              onChange={handleChange}
              required
            />
            {/* <span>Ubicación del evento</span> */}
          </div>

          <h2>Fecha que termina el evento</h2>
          <div className="inputBox">
            <input
              id="fechaTermino"
              name="fechaTermino"
              type="date"
              onChange={handleChange}
              value={datosEvento.fechaTermino}
              required
            />
            {/* <span>Ubicación del evento</span> */}
          </div>
          <h2>Hora que termina el evento</h2>
          <div className="inputBox">

            <input
              id="horaTermino"
              name="horaTermino"
              type="time"
              onChange={handleChange}
              required
            />
            {/* <span>Ubicación del evento</span> */}
          </div>

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
        <h2>Ubicación del evento</h2>

        <div className="regEvContBot">
          <button className="boton1" onClick={() => handleSubmit()}>
            Registrar Evento
          </button>
        </div>
      </div>

    </div>
  );
}

export default RegistroEvento;
