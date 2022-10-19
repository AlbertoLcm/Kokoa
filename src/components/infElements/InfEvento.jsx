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
          <label>{eventoInfo.ubicacion}</label>
          <p>
            Inicia el
            <label> {fecini.toLocaleDateString()} </label>
            a las: 
            <label> {fecini.toLocaleTimeString()} </label>
            horas
          </p>
        </div>
        <div className='anfitrionMarkerInfo'>
        <Link to={`/visperfil/${eventoInfo.id}`}> {evento.hostNombre} </Link> 
          <p> Un evento de {eventoInfo.rol === 'negocios' ? <Link to={`/visperfil/${eventoInfo.id}`}>{evento.hostNombre}</Link> : <label> {evento.hostNombre} </label>}</p>
        </div>
      </section>
    </>
  );


}

export default InfEvento;