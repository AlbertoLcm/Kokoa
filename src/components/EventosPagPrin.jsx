import React from "react";
import "../stylesheets/EventosPagPrin.css"
import image from "../images/concert.jpg"
import { Link, useLocation } from "react-router-dom";

function Evento({ data: evento }) {

  let fechaInicio = new Date(evento.fecha_inicio);
  let fechaActual = new Date();
  let fechaTermino = new Date(evento.fecha_termino);
  fechaInicio.setHours(fechaInicio.getHours() + 6);
  fechaTermino.setHours(fechaTermino.getHours() + 6);

  return (
    <Link to={`?nombre=${evento.nombre}&id=${evento.id_evento}`} className={'linkEventoHome'} >
      <div id="ContEventoHomeFeed" >
        <section id="ContImgEventoFeed">
          <img src={image} id="ImgEventoFeed" />
        </section>

        <section id="ContInfEvento">
          <div className="infEvento">
          <p className="infEventoFecha">
            {fechaInicio < fechaActual && fechaTermino > fechaActual ? (<p className='infEventoFechaActual'>Evento en curso!!!</p>) : fechaTermino < fechaActual ? (<p className='infEventoFechaTermino'>Este evento a finalizado</p>) : (<p className="infEventoFecha">{fechaInicio.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaInicio.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>)}
          </p>
            
            <h2>{evento.nombre}</h2>
            <p className="infEventoUbicacion">
              {evento.direccion}
            </p>
          </div>
        </section>
      </div>
    </Link>
  )

}

export default Evento;