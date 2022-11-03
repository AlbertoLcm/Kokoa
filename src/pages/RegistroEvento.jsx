import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RegistroEvento.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";

function RegistroEvento() {
  const nav = useNavigate();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const successRef = useRef();

  const { addMostrar, user } = useAuth();
  const [showModal, setShowModal] = useState(false);

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
    costo: "",
    capacidad: "",
    descripcion: "",
    tipo: "",
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
    if (originRef.current.value === "") {
      alertRef.current.classList.remove('d-none');
      alertRef.current.innerText = "Debes ingresar la ubicación del evento";
      return;
    }
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
            successRef.current.classList.remove('d-none');
            successRef.current.innerHTML = resultsBD.data.message;
            nav(-1)
          })
          .catch((error) => {
            alertRef.current.classList.remove('d-none');
            alertRef.current.innerHTML = error.response.data.message;
          });
      }
    );
  }

  return (

    <>

      <div id="ContGeneralRegistrarEvento">

          <div ref={alertRef} className="alert d-none">
            Mensaje alert
          </div>
          <div ref={successRef} className="success d-none">
            Mensaje success
          </div>
        <div action="" className="registrarEventoForm">
          <div className="descriptionEvento">
            <textarea className="inputDescripcion" name="descripcion" onChange={handleChange} placeholder="¿De qué trata tu evento?" />
            <p>¿Cómo se llama tu evento?</p>
            <input autoComplete="off" id="nombre" name="nombre" type="text" onChange={handleChange} value={datosEvento.nombre} required />
            <p>Ubicacion del evento</p>
            <Autocomplete>
              <input id="ubicacion" placeholder="" name="ubicacion" type="text" onChange={handleChange} ref={originRef} required />
            </Autocomplete>
            <p>Tipo de evento</p>
            <input autoComplete="off" id="nombre" name="tipo" type="text" onChange={handleChange} required />

            {/* <section className="showMore" onClick={() => setShowModal(!showModal)}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
              </svg>
              Agregar más detalles importantes
            </section> */}
          </div>

          <div id="ContDetallesEvento" >
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
                <input type="number" name="costo" min="0" max="10000" placeholder="Costo" onChange={handleChange} required />
              </div>
              <div>
                <p></p>
                <input type="number" name="capacidad" min="0" placeholder="Capacidad" onChange={handleChange} />
              </div>
              <div className="contCheckbox">
                <p>
                  Publico
                  <input type="checkbox" className="checkbox" defaultChecked={true} />
                </p>
              </div>
            </section>
          </div>

        </div>
        <button className="btnEvento" onClick={() => handleSubmit()}>
          Crear evento
        </button>
      </div>
    </>
  );
}

export default RegistroEvento;
