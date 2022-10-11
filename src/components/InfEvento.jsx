import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../api/axios';
import Skeleton from './Skeleton';

function InfEvento({ id, evento }) {

  const [eventoInfo, setEventoInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance(`/eventos/${id}`)
      .then((host) => {
        evento.hostNombre = host.data.nombre;
        evento.hostId = host.data.id;
        setEventoInfo(evento)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if(loading) {
    return <Skeleton />
  }
  
  return (
    <div id='contInfoEvento'>
      <div className="infoEvento">
        <h1>{eventoInfo.nombre}</h1>
        <label>Un evento de <Link to={`/${eventoInfo.hostId}`}>{eventoInfo.hostNombre}</Link> </label>
        <p>{eventoInfo.descripcion}</p>
        <label>Comienza el día</label>
        <p>{eventoInfo.fecha_inicio}</p>
        <label>y termina el</label>
        <p>{eventoInfo.fecha_termino}</p>

        <label>Úbicado en:</label>
        <p>{eventoInfo.ubicacion}</p>
      </div>
    </div>
  );


}

export default InfEvento;