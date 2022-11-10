import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import MapSmall from "../components/maps/MapSmall";
import imagen from "../images/concert.jpg"
import foto from "../images/Wall (59).jpg";
import '../stylesheets/pages/Eventos.css';
import Skeleton from "../components/Skeleton";
import Comentario from "../components/social/Comentario";
import Comentar from "../components/social/Comentar";
import Modal from "../components/Modal";

function Evento() {
  const { id } = useParams();
  const { user } = useAuth();
  const [evento, setEvento] = useState({});
  const [loading, setLoading] = useState(true);
  const [anfitrion, setAnfitrion] = useState({});
  const [error, setError] = useState(false);
  const [asistencia, setAsistencia] = useState([]);
  const [visua, setVisua] = useState(1);
  const [showModalEvento, setShowModalEvento] = useState(false);
  const [comentarios, setComentarios] = useState([]);

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

    instance.post('/eventos/asistente/check', { id_usuario: user.id })
      .then((asistencias) => {
        setAsistencia(asistencias.data)
      })

    instance.get(`/eventos/comentarios/${id}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
  }, []);

  const [comentarioEvento, setComentarioEvento] = useState({
    comentario: "",
    id_usuario: user.id,
    id_evento: id,
  });

  const handleChangeEvento = (e) => {
    setComentarioEvento({
      ...comentarioEvento,
      [e.target.name]: e.target.value,
    });
  };

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

        instance.post('/eventos/asistente/check', { id_usuario: user.id })
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

        instance.post('/eventos/asistente/check', { id_usuario: user.id })
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

  const actionPublicar = () => {
    const fecha = new Date();
    const fechaActual = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    instance.post("/eventos/comentarios", { comentarioEvento, fecha: fechaActual })
      .then((res) => {
        setShowModalEvento(false);
        instance.get(`/eventos/comentarios/${id}`)
          .then((comentarios) => {
            setComentarios(comentarios.data)
          })
      })
      .catch((err) => console.log(err));
  };

  let fecini = new Date(evento.fecha_inicio)

  return (
    <>
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />
      <div id="ContEventoGeneral">

        <div className="btnBack" onClick={() => nav(-1, { state: { visua: 2 } })}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </div>

        <section id="ContTituloEvento">
          <div id="TituloEvento">
            <div className="contImagenEvento">
              <div className="imagenEvento">
                <img src={imagen} alt="Imagen del evento" />
              </div>
            </div>

            <div className="titulo">
            <p className="infEventoFecha">{fecini.toLocaleDateString('es-us', { weekday:"long", month:"short", year:"numeric", day:"numeric"})}, a las {fecini.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

              <h1>{evento.nombre}</h1>
            </div>

            <div className="botones">
              {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="asistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button> : <button className="asistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>}
              <button>Compartir</button>
            </div>
            <section id="ContBtnEvento">
              <div id="BtnEvento">
                <button onClick={() => setVisua(1)}>Información</button>
                <div className="vrLine" />
                <button onClick={() => setVisua(2)}>Comentarios</button>
              </div>
            </section>
          </div>
        </section>

        <section className="contDetallesEventoGeneral">

          {visua === 1 ? (
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

                  {!location.state ? (

                    <section className="anfitrion">
                      {evento.rol_anfitrion === "negocios" ? (
                        <>
                          <h1>Anfitrion (Negocio)</h1>
                          <Link to={`/visperfil/${evento.anfitrion}`} className={"contDetAnfitrion"}>
                            <div className='contImgAnfitrion'>
                              <img src={imagen} alt="Predefinir" />
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
                              <img src={imagen} alt="Predefinir" />
                            </div>
                            <div className="tituloAnfitiron">
                              Un evento de {anfitrion.nombre}. <br />
                            </div>
                          </section>
                        </>
                      )}
                    </section>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <>
              <section id="OpinionesEvento">
                <Modal
                  estado={showModalEvento}
                  cambiarEstado={setShowModalEvento}
                  titulo={"Comentar"}
                >
                  <div id="contComentarModal">
                    <textarea name="comentario" id="txtComentar" placeholder="Comenta algo acerca de este evento" onChange={handleChangeEvento} />
                    <button onClick={() => actionPublicar()}>Comentar</button>
                  </div>
                </Modal>

                <div id="Comentar">
                  <section className="contFotoUsuario">
                    <img src={foto} alt="Foto Usuario" />
                  </section>

                  <section className="comentario">
                    <p onClick={() => setShowModalEvento(!showModalEvento)}>
                      Comenta algo sobre este evento
                    </p>
                  </section>
                </div>


                {!comentarios.length ? (<div className="comentariosNull"> No hay comentarios </div>) : (null)}
                {comentarios.map((comentario) => {
                  return (
                    <Comentario data={comentario} />
                  )
                })}
              </section>
            </>
          )}

        </section>
      </div>
    </>
  );
}

export default Evento;