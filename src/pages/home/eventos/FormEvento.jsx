import { Autocomplete } from "@react-google-maps/api";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import socket from "../../../components/sockets/Socket";

const FormEvento = () => {

  const { user } = useAuth();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  const navigate = useNavigate();

  const [paso, setPaso] = useState(1);
  const [evento, setEvento] = useState({
    nombre: "",
    fechaInicio: new Date().toISOString().split("T")[0],
    horaInicio: `${new Date().toTimeString().split(":")[0]}:${new Date().toTimeString().split(":")[1]}`,
    fechaTermino: "",
    horaTermino: "",
    costo: 0,
    capacidad: "",
    descripcion: "",
    tipo: "1",
    publico: "1",
    ubicacion: "",
  });

  const handleInputChange = (e) => {
    setEvento({
      ...evento,
      [e.target.name]: e.target.value,
    });
  };

  const crearEvento = () => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: originRef.current.value,
    }, (results) => {
      instance.post("eventos/add", {
        evento,
        id: user.id,
        rol: user.rol,
        ubicacion: originRef.current.value,
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng(),
      })
        .then((resultsBD) => {
          socket.emit('evento', resultsBD.data);
          navigate(`/evento/${resultsBD.data.insert}`);
        })
        .catch((error) => {
          console.log(error)
        });
    }
    );
  }

  switch (paso) {
    case 1:
      return (
        <div className="formAddEvento">
          <section className="titulo">
            <h2>Datos generales del evento</h2>
          </section>

          <section className="datos">
            <input name="nombre" value={evento.nombre} autoComplete="off" autoFocus="true" type="text" placeholder="Nombre" onChange={handleInputChange} />
            <p>¿Cuando sera tu evento?</p>
            <section className="fecha">
              <input name="fechaInicio" type="date" min={new Date().toISOString().split("T")[0]} value={evento.fechaInicio} onChange={handleInputChange} />
              <input name="horaInicio" type="time" min={new Date().toTimeString().split(":")[0]} value={evento.horaInicio} onChange={handleInputChange} />
            </section>
            <p>¿Cuando finaliza tu evento?</p>
            <section className="fecha">
              <input className="input" name="fechaTermino" type="date" min={evento.fechaInicio} onChange={handleInputChange} value={evento.fechaTermino} />
              <input className="input" name="horaTermino" min={evento.horaInicio} type="time" onChange={handleInputChange} value={evento.horaTermino} />
            </section>
          </section>

          <section className="buttons">
            <section className="progress">
              <div className="barra active"></div>
              <div className="barra"></div>
              <div className="barra"></div>
              <div className="barra"></div>
            </section>

            <div>
              <button
                disabled={!evento.nombre || !evento.fechaInicio || !evento.horaInicio || !evento.fechaTermino || !evento.horaTermino ? true : false}
                onClick={() => setPaso(paso + 1)}
                className="btnNext"
              >
                Siguiente
              </button>
            </div>
          </section>
        </div>
      );
    case 2:
      return (
        <div className="formAddEvento">
          <section className="titulo">
            <h2>Información importante</h2>
          </section>

          <section className="datos">
            <p>¿Quien puede ver tu evento?</p>
            <select name="publico" onChange={handleInputChange}>
              <option value="1">Público</option>
              <option value="0">Privado</option>
            </select>
            <p>Agrega la ubicación donde se iniciara el evento</p>
            <Autocomplete>
              <input name="ubicacion" ref={originRef} type="text" placeholder="Ubicación" onChange={handleInputChange} />
            </Autocomplete>

            <section className="buttons">
              <section className="progress">
                <div className="barra active"></div>
                <div className="barra active"></div>
                <div className="barra"></div>
                <div className="barra"></div>
              </section>

              <div className="botones">
                <button onClick={() => setPaso(paso - 1)}>Regresar</button>
                <button
                  disabled={!evento.publico || !evento.ubicacion ? true : false}
                  onClick={() => setPaso(paso + 1)}
                  className="btnNext"
                >
                  Siguiente
                </button>
              </div>
            </section>
          </section>
        </div>
      );
    case 3:
      return (
        <div className="formAddEvento">
          <section className="titulo">
            <h2>Información sobre el evento</h2>
          </section>

          <div className="alert d-none">
            Algo salio mal
          </div>

          <section className="datos">
            <p>¿Cúal es la categoria de tu evento?</p>
            <select name="tipo" onChange={handleInputChange}>
              <option value="1">Fiesta</option>
              <option value="2">Cumpleaños</option>
              <option value="3">Concierto</option>
            </select>

            <p>Explica cual es el proposito o de que trata para que las personas puedan saberlo</p>
            <textarea name="descripcion" cols="30" rows="10" placeholder="¿De que trata tu evento?" onChange={handleInputChange} value={evento.descripcion} />

            <section className="buttons">
              <section className="progress">
                <div className="barra active"></div>
                <div className="barra active"></div>
                <div className="barra active"></div>
                <div className="barra"></div>
              </section>

              <div className="botones">
                <button onClick={() => setPaso(paso - 1)}>Regresar</button>
                <button onClick={() => setPaso(paso + 1)} className="btnNext">Siguiente</button>
              </div>
            </section>
          </section>
        </div>
      );
    case 4:
      return (
        <div className="formAddEvento">
          <section className="titulo">
            <h2>Imagen para tu evento</h2>
          </section>

          <div className="alert d-none">
            Algo salio mal
          </div>

          <section className="datos">
            <div className="subirArchivo">
              <section className="contInputFile">
                <div className="inputFile">
                  <svg xmlns="http:/  /www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                  </svg>
                  Subir Foto
                  <input type="file" accept="image/*" name="evento" />
                </div>
              </section>
            </div>

            <section className="previsualizacion d-none">
              <div className="contImagen">
                <img src="" alt="foto de perfil" />
              </div>
            </section>

            <section className="buttons">
              <section className="progress">
                <div className="barra active"></div>
                <div className="barra active"></div>
                <div className="barra active"></div>
                <div className="barra active"></div>
              </section>

              <div className="botones">
                <button onClick={() => setPaso(paso - 1)}>Regresar</button>
                <button onClick={() => crearEvento()} className="btnNext">Crear Evento</button>
              </div>
            </section>
          </section>
        </div>
      );
    default:
      setPaso(1);
  }
}

export default FormEvento;