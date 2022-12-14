import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import instance from '../../api/axios';
import Skeleton from '../loadings/Skeleton';
import image from '../../images/loginWallpaper.jpg';
import useAuth from '../../auth/useAuth';
import ModalImg from '../modals/ModalImg';

function InfEvento({ evento, cerrar }) {

  const [anfitrion, setAnfitrion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [asistencia, setAsistencia] = useState([]);
  const [opComp, setOpComp] = useState(false);
  const [showModalImg, setShowModalImg] = useState(false);
  const [imgModal, setImgModal] = useState("");
  const location = useLocation();

  const { user } = useAuth();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const successRef = useRef();

  useEffect(() => {
    // Obtenemos el anfitrion
    instance(`/eventos/${evento.id_evento}`)
      .then((anfitrion) => {
        setAnfitrion(anfitrion.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    instance.get(`/eventos/asistente/check/${user.id}`)
      .then((asistencias) => {
        setAsistencia(asistencias.data)
      })
  }, [evento.id_evento]);

  if (loading) {
    return <Skeleton type={'evento'} />
  }

  let fecini = new Date(evento.fecha_inicio);
  let fechaActual = new Date();
  let fechaTermino = new Date(evento.fecha_termino);
  fecini.setHours(fecini.getHours() + 6);
  fechaTermino.setHours(fechaTermino.getHours() + 6);

  const actionAsistir = (id_evento) => {
    instance.post('/eventos/asistente', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance(`/eventos/evento/${id_evento}`)
          .then((eventoResult) => {
            evento = eventoResult.data;
          })

        instance.get(`/eventos/asistente/check/${user.id}`)
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

  const actionAusentar = (id_evento) => {
    instance.post('/eventos/ausentar', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance(`/eventos/evento/${id_evento}`)
          .then((eventoResult) => {
            evento = eventoResult.data;
          })

        instance.get(`/eventos/asistente/check/${user.id}`)
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

  const actionCopiar = (url) => {
    let aux = document.createElement("input");
    aux.setAttribute("value", url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);

    successRef.current.classList.remove('d-none');
    successRef.current.innerHTML = 'Enlace copiado';
  }

  const actionModalImg = (img) => {
    setImgModal(img);
    setShowModalImg(!showModalImg);
  };

  return (
    <>
      <ModalImg
        estado={showModalImg}
        cambiarEstado={setShowModalImg}
      >
        {imgModal && <img src={imgModal} alt="imagen" />}
      </ModalImg>

      <button onClick={() => cerrar()} className="btnCerrar">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="contImagenMarkerInfo">
        <img src={image} alt="imagen" />
      </div>

      <div className='contDataMarkerInfo'>
        <section className="contMarkerInfo">
          {fecini < fechaActual && fechaTermino > fechaActual ? (<p className='infEventoFechaActual'>Evento en curso!!!</p>) : fechaTermino < fechaActual && fecini < fechaActual ? (<p className='infEventoFechaTermino'>Este evento a finalizado</p>) : (<p className="infEventoFecha">{fecini.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fecini.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>)}

          <h2>{evento.nombre}</h2>
          <p className="infEventoUbicacion">
            {evento.direccion}
          </p>
        </section>

        <section className='contBtnMarkerInfo'>
          {asistencia.length ?
            asistencia.find((asistencia => asistencia.id_evento === evento.id_evento)) ? (<button className="asistir true" onClick={() => actionAusentar(evento.id_evento)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="#f3f3f3" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              Asistiras
            </button>) : (<button className="asistir false" onClick={() => actionAsistir(evento.id_evento)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              Asistir
            </button>)
            : (<button className="asistir false" onClick={() => actionAsistir(evento.id_evento)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
              </svg>
              Asistir
            </button>)}
          <button className='invitar' onClick={() => setOpComp(!opComp)}>Compartir</button>
          {
            opComp && (
              <div className="opCompartir">
                <div ref={successRef} className="success d-none">
                  Todo correcto
                </div>
                <p>Link del evento</p>
                <p id="linkComp">{window.location.href}</p>
                <button className='compartir' onClick={() => actionCopiar()}>Copiar Link</button>
              </div>
            )
          }
        </section>

        <section id="EventoInfo">
          <div className='detEvent'>
            <h1>Detalles</h1>
            <div className="detalles">
              {evento.capacidad ? <p>Capacidad {evento.capacidad} personas</p> : null}
              <p className="asistentes">Asistiran {evento.asistentes_cont} personas</p>
              {evento.precio === 0 || evento.precio === null ? <p className="gratis"> Entrada gratuita </p> : <p className="cover"> Cover ${evento.precio} </p>}
              <Link to={`evento/${evento.nombre}/${evento.id_evento}/informacion`} state={{ from: location }} className="link">Ver m??s</Link>
            </div>
          </div>
          {anfitrion.rol === "negocios" ? (
            <div className='detAnfit'>
              <h1>Anfitrion (Negocio)</h1>
              <Link to={`/negocio/${anfitrion.nombre}/${evento.anfitrion}`} className={"contDetAnfit"}>
                <div className='contImgAnfEve'>
                  <img src={anfitrion.perfil} alt="Predefinir" />
                </div>
                <div>
                  Un evento de {anfitrion.nombre}. <br />
                  <label> Conocer </label>
                </div>
              </Link>
            </div>
          ) : (
            <div className='detAnfitNormal'>
              <h1>Anfitrion</h1>
              <section className='contDetAnfit'>
                <div className='contImgAnfEve'>
                  <img src={anfitrion.perfil} alt="Predefinir" />
                </div>
                <div>
                  Un evento de {anfitrion.nombre}. <br />
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