import React, { useRef, useState } from "react";
import "../stylesheets/RegistroEvento.css";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import img from "../images/Plagui.jpg";

function RegistroEvento({ negocio = false, map }) {
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const successRef = useRef();
  const mensajeRef1 = useRef();
  const mensajeRef2 = useRef();

  const { addMostrar, user } = useAuth();
  const [patrocinadores, setPatrocinadores] = useState([]);
  const [artistas, setArtistas] = useState([]);
  const [solis, setSolis] = useState([]);

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
    costo: 0,
    capacidad: "",
    descripcion: "",
    tipo: "",
    publico: "1",
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
          })
          .catch((error) => {
            console.log(error)
            alertRef.current.classList.remove('d-none');
            alertRef.current.innerHTML = error.response.data.message;
          });
      }
    );
    EnvSols()
  }

  const actionBuscarPatrocinador = () => {
    instance.post('/patrocinadores/tipo', buscador)
      .then((results) => {
        mensajeRef1.current.classList.add('d-none');
        setPatrocinadores(results.data);
      })
      .catch((error) => {
        mensajeRef1.current.classList.remove('d-none');
        mensajeRef1.current.innerHTML = error.response.data.message;
        setPatrocinadores([]);
      });
  };

  const actionBuscarEntretenimiento = () => {
    instance.post('/artistas/tipo', buscadorEntretenimiento)
      .then((results) => {
        mensajeRef2.current.classList.add('d-none');
        setArtistas(results.data);
      })
      .catch((error) => {
        mensajeRef2.current.classList.remove('d-none');
        mensajeRef2.current.innerHTML = error.response.data.message;
        setArtistas([]);
      });
  };

  const AñSols = (id, nombre, rol, perfil) => {
    if((solis.filter((sol) => sol.nombre === nombre).length === 0)){
      setSolis([...solis, {
        nombre: nombre,
        perfil: perfil,
        propietario: user.id, 
        propietario_rol: user.rol, 
        receptor: id,
        receptor_rol: rol} ] )
    }
  }
  const DelSols = (nombre) => {
    setSolis(solis.filter((sol) => sol.nombre !== nombre ))
  }
  const EnvSols = () => {
      solis.map((sol) => {
        instance.post('/mensajes/chats', {
          propietario: sol.propietario, 
          propietario_rol: sol.propietario_rol, 
          receptor: sol.receptor, 
          receptor_rol: sol.receptor_rol,
          perfil: sol.perfil,
          nombre: sol.nombre
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
      })
  }

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
                <select name="publico" id="tipo" onChange={handleChange}>
                  <option value="1" selected>Publico</option>
                  <option value="0">Privado</option>
                </select>
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
                <div className="mensaje1" ref={mensajeRef1}>
                    Busca un artista
                  </div>
                  {patrocinadores.map((patrocinador, index) => {
                    return (
                      <div key={index} className="tarjHome" onClick={() => AñSols(patrocinador.id, patrocinador.nombre, patrocinador.rol, patrocinador.perfil)}>
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
                  <div className="mensaje2" ref={mensajeRef2}>
                    Busca un artista
                  </div>
                  {artistas.map((artista, index) => {
                    return (
                      <div key={index} className="tarjHome" onClick={() => AñSols(artista.id, artista.nombre, artista.rol, artista.perfil)}>
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
                {
                  solis.length > 0 ? (
                    <section>
                      <center><hr id="hrBusc" /></center>
                      <fieldset>
                        <legend>Seleccion de patrocinios y entretenimiento</legend>
                        {solis.map((sol, index) => {
                          return (
                            <div className="tarjSol" key={index}>
                              <span>{sol.nombre} ({sol.rol})</span>
                              <button onClick={() => DelSols(sol.nombre)} title="Borrar de la lista"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-x" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg></button>
                              <button title="Ir a su perfil"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg></button>
                            </div>
                          )
                        })}
                      </fieldset>
                    </section>
                  ) :(
                    <div/>
                  )
                }
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