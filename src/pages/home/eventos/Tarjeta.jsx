import React from "react";
import { Link } from "react-router-dom";

const Tarjeta = ({ evento, key }) => {

  let fechaInicio = new Date(evento.fecha_inicio);
  let fechaTermino = new Date(evento.fecha_termino);
  let fechaActual = new Date();
  
  return (
    <Link to={`?nombre=${evento.nombre}&id=${evento.id_evento}`} className={'linkEventoHome'} key={key}>
      <div className="tarjeta">
        <section className="imagen">
          <div className="contImagen">
            <img src={require('../../../images/concert.jpg')} alt="imagen" />
          </div>
        </section>
        <section className="datos">
          {fechaActual > fechaInicio ? <p className="fecha curso">Evento en curso</p> : <p className="fecha">{fechaInicio.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}</p>}
          
          {/* {fechaInicio < fechaActual ? (<p className='fecha curso'>Evento en curso</p>) : fechaTermino < fechaActual ? (<p className='fecha finalizado'>Este evento a finalizado</p>) : (<p className="fecha">{fechaInicio}</p>)} */}
          <h2>{evento.nombre}</h2>
          <p className="lugar">{evento.direccion}</p>
        </section>
      </div>
    </Link>
  );
};

export default Tarjeta;