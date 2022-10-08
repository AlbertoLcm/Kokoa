import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../api/axios";
import '../stylesheets/Home.css';

function EventoInfo () {

  const [evento, setEvento] = useState({});
  const {id} = useParams();

  useEffect(() => {
    // llamada a la api para obtener el evento
    const getEvento = () => {
      instance.get(`/eventos/${id}`).then((results) => {
        setEvento(results.data[0]);
      });
    };

    getEvento();
  }, []);

  console.log(evento)
  
  return (
    <div id='contEvento'>
      <h1>Evento</h1>
      {evento.nombre}
      <h2>Descripcion</h2>
      {evento.descripcion}
      <h2>Fecha</h2>
      {evento.fecha_inicio}
      <p>Me han pasado la id  en el state</p>
      <Link to='/'>Volver al mapa</Link>
    </div>
  );
}

export default EventoInfo;