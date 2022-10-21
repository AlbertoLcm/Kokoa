import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../api/axios';
import Skeleton from '../Skeleton';
import image from '../../images/loginWallpaper.jpg';

function InfEvento({ id, evento, cerrar }) {

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
      <div className="contImagenMarkerInfo">
        <button onClick={() => cerrar()}>x</button>
        <img src={image} alt="imagen" />
      </div>

      <div className='contDataMarkerInfo'>
        <section className="contMarkerInfo">
          <p className="infEventoFecha">
            Incia el
            {` ${fecini.toLocaleDateString()} `}
            a las
            {` ${fecini.toLocaleTimeString()} `}
            horas
          </p>
          <h2>{evento.nombre}</h2>
          <p className="infEventoUbicacion">
            {evento.ubicacion}
          </p>
        </section>

        <section className='contBtnMarkerInfo'>
          <button> Asistir </button>
          <button> Invitar </button>
        </section>

        <section id="EventoInfo">
          <div className='detEvent'>
            <h1>Detalles</h1>
            <p>{eventoInfo.detalles}</p>
          </div>
          <div className='detAnfit'>
            <h1>Anfitrion</h1>
            <Link to={`/visperfil/${eventoInfo.id}`} className={"contDetAnfit"}>
              <div className='contImgAnfEve'>
                <img src={image} alt="Predefinir" />
              </div>
              <div>
                Un evento de {eventoInfo.hostNombre}. <br /> 
                <label> Conocer </label>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );


}

export default InfEvento;