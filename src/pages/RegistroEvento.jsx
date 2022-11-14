import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/RegistroEvento.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import img from "../images/Plagui.jpg"

function RegistroEvento({ negocio = false }) {
  const nav = useNavigate();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const successRef = useRef();

  const { addMostrar, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [patrocinadores, setPatrocinadores] = useState([]);
  const [artistas, setArtistas] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });

  const [buscador, setBuscador] = useState({
    tipo: "1"
  });

  const [buscadorEntretenimiento, setBuscadorEntretenimiento] = useState({
    tipo: "1"
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

  const handleBuscador = (e) => {
    setBuscador({
      ...buscador,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuscadorEnt = (e) => {
    setBuscadorEntretenimiento({
      ...buscadorEntretenimiento,
      [e.target.name]: e.target.value,
    });
  };
  
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

  const actionBuscarPatrocinador = () => {
    instance.post('/patrocinadores/tipo', buscador)
      .then((results) => {
        setPatrocinadores(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionBuscarEntretenimiento = () => {
    instance.post('/artistas/tipo', buscadorEntretenimiento)
      .then((results) => {
        setArtistas(results.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (

    <>

      <div id="ContGeneralRegistrarEvento">

        <div ref={alertRef} className="alert d-none">
          Algo salio mal
        </div>
        <div ref={successRef} className="success d-none">
          Todo correcto
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
            <select name="tipo" id="tipo" onChange={handleChange}>
              <option value="1" selected>Fiesta</option>
              <option value="2">Concierto</option>
            </select>
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

          {negocio ? (
            <>
              <center><hr id="hrBusc" /></center>
              <h2>Patrocinadores</h2>
              <div className="contBusc">
                <section id="secHeBusc">
                  <select type="text" name="tipo" onChange={handleBuscador} className="selBusc">
                    <option value="1">Bebidas</option>
                    <option value="2">Alcohol</option>
                    <option value="3">Entretenimiento</option>
                  </select>
                  <button className="botBusc" onClick={() => actionBuscarPatrocinador()} >Buscar</button>
                </section>

                <section className="contBuscPatr">
                  {!patrocinadores.length ? (<p>Busca un patrocinador para mostrar algo</p>) : (null)}
                  {patrocinadores.map((patrocinador) => {
                    return (
                      <div className="tarjHome" >
                        <div className="contImgTarj">
                          <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                        </div>
                        <div className="contInfoTarj">
                          <h1>{patrocinador.nombre} </h1>
                          <p>{patrocinador.descripcion}</p>
                        </div>
                      </div>
                    )
                    })}
                </section>
              </div>

              <center><hr id="hrBusc" /></center>
              <div><h2>Entretenimiento</h2></div>
              <div className="contBusc">
                <section id="secHeBusc">
                  <select type="text" name="tipo" onChange={handleBuscadorEnt} className="selBusc">
                    <option value="1">Entretenimiento</option>
                    <option value="2">Música</option>
                  </select>
                  <button className="botBusc" onClick={() => actionBuscarEntretenimiento()}>Buscar</button>
                </section>

                <section className="contBuscPatr">
                  {!artistas.length ? (<p>Busca un artista para mostrar algo</p>) : (null)}
                  {artistas.map((artista) => {
                    return (
                      <div className="tarjHome" >
                        <div className="contImgTarj">
                          <div className="contContimg"><img src={img} alt="Sin imagen" /></div>
                        </div>
                        <div className="contInfoTarj">
                          <h1>{artista.nombre} </h1>
                          <p>{artista.descripcion}</p>
                        </div>
                      </div>
                    )
                    })}
                </section>
              </div>
            </>
          ) : (null)}
        </div>

        <button className="btnEvento" onClick={() => handleSubmit()}>
          Crear evento
        </button>
      </div>
    </>
  );
}

export default RegistroEvento;
