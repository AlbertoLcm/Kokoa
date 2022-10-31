import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../api/axios';
import Skeleton from '../Skeleton';
import image from '../../images/loginWallpaper.jpg';

function InfEvento({ evento, cerrar }) {

  const [eventoInfo, setEventoInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance(`/eventos/${evento.id_evento}`)
      .then((anfitrion) => {
        evento.hostNombre = anfitrion.data.nombre;
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
      <button onClick={() => cerrar()} className="btnCerrar">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
      </button>

      <div className="contImagenMarkerInfo">
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
            {evento.direccion}
          </p>
        </section>

        <section className='contBtnMarkerInfo'>
          <button> Asistir </button>
          <button> Invitar </button>
        </section>

        <section id="EventoInfo">
          <div className='detEvent'>
            <h1>Detalles</h1>
            <div className="detalles">
              {evento.capacidad ? <p>Capacidad {evento.capacidad} personas</p> : null}
              <p className="asistentes">Asistiran 12 personas</p>
              {evento.precio === 0 || evento.precio === null ? <p className="gratis"> Entrada gratuita </p> : <p className="cover"> Cover ${evento.precio} </p>}
            </div>
          </div>
          {evento.rol_anfitrion === "negocios" ? (
            <div className='detAnfit'>
              <h1>Anfitrion (Negocio)</h1>
              <Link to={`/visperfil/${eventoInfo.anfitrion}`} className={"contDetAnfit"}>
                <div className='contImgAnfEve'>
                  <img src={image} alt="Predefinir" />
                </div>
                <div>
                  Un evento de {eventoInfo.hostNombre}. <br />
                  <label> Conocer </label>
                </div>
              </Link>
            </div>
          ) : (
            <div className='detAnfitNormal'>
              <h1>Anfitrion</h1>
              <section className='contDetAnfit'>
                <div className='contImgAnfEve'>
                  <img src={image} alt="Predefinir" />
                </div>
                <div>
                  Un evento de {eventoInfo.hostNombre}. <br />
                </div>
              </section>
            </div>

          )}
        </section>
      </div>
    </>
  );


}

export default InfEvento;