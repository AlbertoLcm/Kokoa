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
        <div id="contImagenMarkerInfo">
          <img src={image} alt="imagen" id="imagenMarkerInfo" />
        </div>
      <section id="contMarkerInfo">
      <p>
            Inicia el
            <label> {fecini.toLocaleDateString()} </label>
            a las: 
            <label> {fecini.toLocaleTimeString()} </label>
            horas
          </p>
        <div className='datosMarkerInfo'>
          <h1>{eventoInfo.nombre}</h1>
          <label>{eventoInfo.ubicacion}</label>
        </div>
      </section>

      <section id="botAsist">
        <button>Asistir</button>
        <button>Invitar</button>
      </section>

      <section id="eventoInfo">
        <div className='detEvent'>  
          <h1>Detalles</h1>
          <p>{eventoInfo.detalles}</p>
        </div>
        <div className='detAnfit'>
          <Link to={`/visperfil/${eventoInfo.id}`}>
            <div className='anfitrionMarkerInfo'>
              <div className='contImgAnfEveGen'>
                <div className='contImgAnfEve'>
                  <img src={image} alt="Predefinir" id="imgAnfMark" />
                </div>
              </div>
              <label >Un evento de</label>
              <h2> {eventoInfo.hostNombre}</h2>
              <br />
              <h2>Conocer</h2>
            </div>  
          </Link> 
        </div>
      </section>
    </>
  );


}

export default InfEvento;