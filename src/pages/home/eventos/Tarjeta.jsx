import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Tarjeta = ({ evento, key }) => {

  const [params] = useSearchParams();
  const navigation = useNavigate();

  let fechaInicio = new Date(evento.fecha_inicio);
  let fechaActual = new Date();

  console.log(params.forEach((value, key) => {
    if(key === 'id' && key === 'nombre'){
      console.log(value);
    }
  }));

  return (
    <div className="tarjeta" key={key}
      onClick={() => {
        // agregamos el id del evento a la url, si hay parametros los dejamos
        // si existe el parametro id, lo reemplazamos por el nuevo
        if (params.has("id") && params.has("nombre") ) {
          params.delete("id");
          params.delete("nombre");
        }
        let url = params.toString() ? `?${params.toString()}&id=${evento.id_evento}&nombre=${evento.nombre}` : `?id=${evento.id_evento}&nombre=${evento.nombre}`;
        navigation(url)
      }}
    >
      <section className="imagen">
        <div className="contImagen">
          <img src={require('../../../images/concert.jpg')} alt="imagen" />
        </div>
      </section>
      <section className="datos">
        {fechaActual > fechaInicio ? <p className="fecha curso">Evento en curso</p> : <p className="fecha">{fechaInicio.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}</p>}
        <h2>{evento.nombre}</h2>
        <p className="lugar">{evento.direccion}</p>
      </section>
    </div>
  );
};

export default Tarjeta;