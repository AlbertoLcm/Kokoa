import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import MapSmall from "../components/maps/MapSmall";
import imagen from "../images/concert.jpg"
import '../stylesheets/pages/Eventos.css';
import Skeleton from "../components/loadings/Skeleton";
import Comentario from "../components/social/Comentario";
import Modal from "../components/modals/Modal";
import socket from "../components/sockets/Socket";
import routes from "../helpers/routes";
import ModalImg from "../components/modals/ModalImg";

function Evento() {
  const { id } = useParams();
  const { user } = useAuth();
  const [evento, setEvento] = useState({});
  const [loading, setLoading] = useState(true);
  const [anfitrion, setAnfitrion] = useState({});
  const [error, setError] = useState(false);
  const [asistencia, setAsistencia] = useState([]);
  const [opComp, setOpComp] = useState(false);
  const [showModalImg, setShowModalImg] = useState(false);
  const [imgModal, setImgModal] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const successRef = useRef();

  const location = useLocation();
  const nav = useNavigate();

  


  useEffect(() => {


    // Obtenemos el evento
    instance.get(`/eventos/evento/${id}`)
      .then((res) => {
        setEvento(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));

    // Obtenemos el anfitrion
    instance.get(`/eventos/${id}`)
      .then((res) => {
        setAnfitrion(res.data);
      })

    instance.get(`/eventos/asistente/check/${user.id}`)
      .then((asistencias) => {
        setAsistencia(asistencias.data)
      })
    
  }, []);

 
  

  if (loading) {
    return (
      <section id="ContEventoGeneralSecundario">
        <Skeleton type={"perfilFeed"} />
      </section>
    )
  }

  if (error) {
    return (
      <>
        <Header tipo={'responsive'} perfil={user.nombre} back={true} />
        <section id="ContEventoGeneralSecundario">
          <div> Este evento no existe, ha sido borrado o se ha deshabilitado. </div>
        </section>
      </>
    )
  }

  const actionAsistir = (id_evento) => {
    instance.post('/eventos/asistente', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance(`/eventos/evento/${id_evento}`)
          .then((eventoResult) => {
            setEvento(eventoResult.data);
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
            setEvento(eventoResult.data);
          })

        instance.get(`/eventos/asistente/check/${user.id}`)
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

 

  const actionCopiar = () => {
    let aux = document.createElement("input");
    aux.setAttribute("value", window.location.href);
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

  let fecini = new Date(evento.fecha_inicio);
  let fechaActual = new Date();
  let fechaTermino = new Date(evento.fecha_termino);
  fecini.setHours(fecini.getHours() + 6);
  fechaTermino.setHours(fechaTermino.getHours() + 6);

  const Comentarios = () => {
    
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [comentarioData, setComentarioData] = useState({
      comentario: "",
      id_usuario: user.id,
      id_evento: id,
      rol_usuario: user.rol,
    });

    useEffect(() => {
      instance.get(`/eventos/comentarios/${id}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
    socket.on('new-comentario', (comentario) => {
      instance.get(`/eventos/comentarios/${id}`)
        .then((comentarios) => {
          setLoading(false);
          setComentarios(comentarios.data)
        })
    })
    }, [])

    const handleComentario = (e) => {
      setComentarioData({
        ...comentarioData,
        comentario: e.target.value,
      });
    };

    const actionPublicar = (e) => {
      e.preventDefault();
      if (comentarioData.comentario === "") return;
      setLoading(true);
      instance.post("/eventos/comentarios", comentarioData)
        .then((res) => {
          setComentarioData({
            comentario: "",
            id_usuario: user.id,
            id_evento: id,
            rol_usuario: user.rol,
          });
          socket.emit('comentar', comentarioData);
        })
        .catch((err) => console.log(err));
    };
    
    return (
      <Fragment>
        <section id="OpinionesEvento">

          {user ? (<div id="Comentar">
            <section className="contFotoUsuario">
              <img src={user.perfil} alt="Foto Usuario" />
            </section>

            <section className="comentario">
              <form onSubmit={actionPublicar} method="POST">
                <input disabled={ loading ? true : false } type="text" autoComplete="off" name="comentario" className="textarea" placeholder="Comenta algo sobre este evento" onChange={handleComentario} value={comentarioData.comentario} />
                <button type="submit" disabled={loading ? true : false}>{loading ? "Comentando..." : "Comentar" }</button>
              </form>
            </section>
          </div>) : (<div id="Comentar">
            <section className="comentario">
              <p onClick={() => nav(routes.login, { state: { from: location, pagina: 2 } })}>
                Comenta algo sobre este evento
              </p>
            </section>
          </div>
          )}
          {!comentarios.length ? (<div className="comentariosNull"> No hay comentarios </div>) : (null)}
          {comentarios.map((comentario) => {
            return <Comentario data={comentario} />
          })}
        </section>
      </ Fragment>
    );
  }

  const Informacion = () => {
    return (
      <div className="contDetallesEvento">
        <div className="detallesEvento">
          <div className="ubicacion">
            <section className="mapa">
              <MapSmall evento={{ lat: evento.lat, lng: evento.lng }} />
              <p>{evento.direccion}</p>
            </section>
          </div>

          <div className="detalles">
            <section className="informacion">
              <h1>Detalles</h1>
              <p className="infEventoFecha">Conclusión, {fechaTermino.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaTermino.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p className="direccion">
                {evento.direccion}
              </p>
              {evento.capacidad ? <p className="capacidad">Capacidad para {evento.capacidad} personas</p> : <p className="sinCapacidad">Capacidad para todos</p>}
              <p className="asistentes">Asistiran {evento.asistentes_cont} personas</p>
              {evento.precio === 0 || evento.precio === null ? <p className="gratis"> Entrada gratuita </p> : <p className="cover"> Cover ${evento.precio} </p>}

            </section>

            <section className="descripcion">
              <h1>¿De qué trata este evento?</h1>
              {evento.descripcion}
            </section>

            <section className="tipo">
              <h1>Tipo de evento</h1>
              {evento.tipo}
            </section>

            {location?.state?.from?.pathname ? (
              (!(location?.state?.from?.pathname).includes("negocio/")) ? (
                <section className="anfitrion">
                  {evento.rol_anfitrion === "negocios" ? (
                    <>
                      <h1>Anfitrion (Negocio)</h1>
                      <Link to={`/negocio/${evento.nombre}/${evento.anfitrion}`} className={"contDetAnfitrion"}>
                        <div className='contImgAnfitrion'>
                          <img src={anfitrion.perfil} alt="Predefinir" />
                        </div>
                        <div className="tituloAnfitiron">
                          Un evento de {anfitrion.nombre}. <br />
                          <label> Conocer </label>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <h1>Anfitrion</h1>
                      <section className='contDetAnfitrion'>
                        <div className='contImgAnfitrion'>
                          <img src={anfitrion.perfil} alt="Predefinir" />
                        </div>
                        <div className="tituloAnfitiron">
                          Un evento de {anfitrion.nombre}. <br />
                        </div>
                      </section>
                    </>
                  )}
                </section>
              ) : (null)
            ) : (
              <section className="anfitrion">
                {evento.rol_anfitrion === "negocios" ? (
                  <>
                    <h1>Anfitrion (Negocio)</h1>
                    <Link to={`/negocio/${evento.nombre}/${evento.anfitrion}`} className={"contDetAnfitrion"}>
                      <div className='contImgAnfitrion'>
                        <img src={anfitrion.perfil} alt="Predefinir" />
                      </div>
                      <div className="tituloAnfitiron">
                        Un evento de {anfitrion.nombre}. <br />
                        <label> Conocer </label>
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <h1>Anfitrion</h1>
                    <section className='contDetAnfitrion'>
                      <div className='contImgAnfitrion'>
                        <img src={anfitrion.perfil} alt="Predefinir" />
                      </div>
                      <div className="tituloAnfitiron">
                        Un evento de {anfitrion.nombre}. <br />
                      </div>
                    </section>
                  </>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ModalImg
        estado={showModalImg}
        cambiarEstado={setShowModalImg}
      >
        {imgModal && <img src={imagen} alt="imagen" />}
      </ModalImg>

      <Header tipo={'responsive'} perfil={user.nombre} back={true} />
      <div id="ContEventoGeneral">

        {location.state?.from ? (
          <div className="btnBack" onClick={() => nav(-1, { state: { from: location, pagina: 2 } })}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          </div>
        ) : (null)}

        <section id="ContTituloEvento">
          <div id="TituloEvento">
            <div className="contImagenEvento">
              <div className="imagenEvento" onClick={() => actionModalImg("hola")}>
                <img src={imagen} alt="Imagen del evento" />
              </div>
            </div>

            <div className="titulo">
              {fecini < fechaActual && fechaTermino > fechaActual ? (<p className='infEventoFechaActual'>Evento en curso!!!</p>) : fechaTermino < fechaActual ? (<p className='infEventoFechaTermino'>Este evento a finalizado</p>) : (<p className="infEventoFecha">{fecini.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fecini.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>)}
              <h1>{evento.nombre}</h1>
            </div>

            <div className="botones">

              {asistencia.length ?
                asistencia.find((asistencia => asistencia.id_evento === evento.id_evento)) ? (<button className="asistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button>) : (<button className="asistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>)
                : (<button className="asistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>)}
              <button className='invitar' onClick={() => setOpComp(!opComp)}>Compartir</button>

              {
                opComp && (
                  <div className="opCompartir">
                    <div ref={successRef} className="success d-none">
                      Todo correcto
                    </div>
                    <p>Link del evento</p>
                    <p id="linkComp">{window.location.href}</p>
                    <button onClick={() => actionCopiar()}>Copiar Link</button>
                  </div>
                )
              }
            </div>
            <section id="ContBtnEvento">
              <div id="BtnEvento">
                <NavLink to={`informacion`} className={({ isActive }) => isActive ? "active" : ""} >Información</NavLink>
                <div className="vrLine" />
                <NavLink to={`comentarios`}>Comentarios</NavLink>
              </div>
            </section>
          </div>
        </section>

        <section className="contDetallesEventoGeneral">
          <Routes>
            <Route path="informacion" element={<Informacion />} />
            <Route path="comentarios" element={<Comentarios />} />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default Evento;