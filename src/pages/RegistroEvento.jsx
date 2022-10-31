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
            id: user.id,
            rol: user.rol,
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
            console.log(error);
            alert(error.response.data.message);
          });
      }
    );
  }

  return (
    <div id="ContGeneralRegistrarEvento">
      <div action="" className="registrarEventoForm">
        <p></p>
        <input id="nombre" name="nombre" type="text" onChange={handleChange} value={datosEvento.nombre} placeholder="Nombre del evento" required />
        <p>Ubicacion del evento</p>
        <Autocomplete>
          <input id="ubicacion" name="ubicacion" type="text" onChange={handleChange} ref={originRef} required />
        </Autocomplete>
        <section className="horarios">
          <div>
            <p>Inicia el día</p>
            <input id="fechaInicio" name="fechaInicio" type="date" onChange={handleChange} value={datosEvento.fechaInicio} required />
          </div>
          <div>
            <p>a las</p>
            <input id="horaInicio" name="horaInicio" type="time" onChange={handleChange} required />
          </div>
        </section>

        <section className="horarios">
          <div>
            <p>Termina el día</p>
            <input id="fechaTermino" name="fechaTermino" type="date" onChange={handleChange} value={datosEvento.fechaTermino} required />
          </div>
          <div>
            <p>a las</p>
            <input id="horaTermino" name="horaTermino" type="time" onChange={handleChange} required />
          </div>
        </section>

        <section className="detalles">
          <div>
            <p></p>
            <input type="number" placeholder="Costo" />
          </div>
          <div>
            <p></p>
            <input type="number" placeholder="Capacidad" />
          </div>
          <div className="contCheckbox">
            <p>
              Publico
              <input type="checkbox" className="checkbox" defaultChecked={true} />
            </p>
          </div>
        </section>
        <button className="btnEvento" onClick={() => handleSubmit()}>
          Crear evento
        </button>
      </div>
    </div>
  );
}

export default RegistroEvento;
