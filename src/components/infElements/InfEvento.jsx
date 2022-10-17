import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../api/axios';
import Skeleton from '../Skeleton';
import image from '../../images/loginWallpaper.jpg';

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

  if (loading) {
    return <Skeleton type={'evento'} />
  }
  let fecini = new Date(eventoInfo.fecha_inicio)
  let fecter = new Date(eventoInfo.fecha_termino)

  return (
    <>
      <section className='contImageMakerInfoFondo'>
        <div id="contImagenMarkerInfo">
          <img src={image} alt="imagen" id="imagenMarkerInfo" />
        </div>
      </section>

      <section id="contMarkerInfo">
        <div className='datosMarkerInfo'>
          <h1>{eventoInfo.nombre}</h1>
          <p>{eventoInfo.ubicacion}</p>
          <p>
            <label> Inicia el </label>
            {fecini.toLocaleDateString()}
            <label> A las: </label>
            {fecini.toLocaleTimeString()}
            <label> horas</label>
          </p>
        </div>
        <div className='anfitrionMarkerInfo'>
          <p> <label> Un evento de </label> {eventoInfo.rol === 'negocios' ? <Link to={`/visperfil/${eventoInfo.id}`}>{evento.hostNombre}</Link> : evento.hostNombre}</p>
        </div>
      </section>
    </>
  );


}

export default InfEvento;