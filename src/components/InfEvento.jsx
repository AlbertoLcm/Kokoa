import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../api/axios';
import Skeleton from './Skeleton';
import routes from '../helpers/routes';

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
  const fecini = new Date(eventoInfo.fecha_inicio);
  const fecter = new Date(eventoInfo.fecha_termino)


  return (
    <div id='contInfoEvento'>
      <div className="infoEvento">
        <h1>{eventoInfo.nombre}</h1>
        <label>Un evento de <Link to={`/visperfil/${eventoInfo.id}` }>{eventoInfo.hostNombre}</Link> </label>
        <p>{eventoInfo.descripcion}</p>
        <label>Comienza el día</label>
        <p>{fecini.toLocaleDateString()}</p>
        <label>a las </label>
        <p>{fecini.toLocaleTimeString()}</p>
        <label>y termina el</label>
        <p>{fecter.toLocaleDateString()}</p>
        <label>a las </label>
        <label>Úbicado en:</label>
        <p>{fecter.toLocaleTimeString()} </p>
        <p>{eventoInfo.ubicacion}</p>
      </div>
    </div>
  );


}

export default InfEvento;