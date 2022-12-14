import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../loadings/Skeleton";
import image from "../../images/concert.jpg"
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import LoadingElement from "../loadings/LoadingElement";

function ListaEventosFeed({ id, solicito }) {

  const { user } = useAuth();
  const location = useLocation();

  const [eventos, setEventos] = useState([]);
  const [anteriores, setAnteriores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [asistencia, setAsistencia] = useState([]);

  useEffect(() => {
    instance.get(`/eventos/actuales/${id}`)
      .then((eventos) => {
        setEventos(eventos.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    instance.get(`/eventos/anteriores/${id}`)
      .then((eventos) => {
        setAnteriores(eventos.data)
      })
      .catch((err) => console.log(err))

    instance.get(`/eventos/asistente/check/${user.id}`)
      .then((asistencias) => {
        setAsistencia(asistencias.data)
      })
  }, []);

  const actionAsistir = (id_evento) => {
    instance.post('/eventos/asistente', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance.get(`/eventos/all/${id}`)
          .then((eventos) => {
            setEventos(eventos.data)
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
        instance.get(`/eventos/all/${id}`)
          .then((eventos) => {
            setEventos(eventos.data)
          })

        instance.get(`/eventos/asistente/check/${user.id}`)
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

  if (loading) {
    return (
      <section id="ContPerfilFeedEventoActual">
        <LoadingElement />
      </section>
    )
  };

  switch (solicito) {
    case 'proximos': return (
      <>
        {!eventos.length ? (<p className="sinData"> No hay eventos </p>) : (null)}
        {eventos.map((evento) => {
          const fechaInicio = new Date(evento.fecha_inicio);
          return (
            <div id="PerfilFeedEvento">
              <section id="ContImgEventoFeed">
                <img src={image} id="ImgEventoFeed" alt="nanay" />
              </section>

              <section id="ContInfEvento">
                <div className="infEvento">
                  <p className="infEventoFecha">{fechaInicio.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaInicio.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                  <h2>{evento.nombre}</h2>
                  <p className="infEventoUbicacion">
                    {evento.direccion}
                  </p>
                  <p className="asistentesEvento">
                    Asistiran {evento.asistentes_cont} personas
                  </p>
                  <Link to={`/evento/${evento.id_evento}`} state={{ from: location, pagina: 2 }} className="link">Ver más</Link>
                </div>

                <div className="coverEvento">
                  {evento.precio === null || evento.precio === 0 ? <p> Entrada gratuita </p> : <p className="cover"> Cover: {evento.precio} </p>}

                  {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="btnAsistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button> : <button className="btnAsistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>}
                </div>
              </section>
            </div>
          )
        })}
      </>
    )

    case 'anteriores': return (
      <>
        {!anteriores.length ? (<p className="sinData"> No hay eventos </p>) : (null)}
        {anteriores.map((evento) => {
          const fechaTermino = new Date(evento.fecha_termino);
          return (
            <div id="PerfilFeedEvento">
              <section id="ContImgEventoFeed">
                <img src={image} id="ImgEventoFeed" alt="nanay" />
              </section>

              <section id="ContInfEvento">
                <div className="infEvento">
                  <p className="infEventoFecha">Finalizó el {fechaTermino.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaTermino.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                  <h2>{evento.nombre}</h2>
                  <p className="infEventoUbicacion">
                    {evento.direccion}
                  </p>
                  <p className="asistentesEvento">
                    Asistieron {evento.asistentes_cont} personas
                  </p>
                  <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                </div>

                <div className="coverEvento">
                  {evento.precio === null || evento.precio === 0 ? <p> La entrada fue gratuita </p> : <p className="cover"> Tuvo un cover de: ${evento.precio} </p>}

                </div>
              </section>
            </div>
          )
        })}
      </>
    )

    case 'negocios': return (
      <>
        {!eventos.length ? (<div className="notData"> No hay eventos actuales </div>) : (null)}
        <section className="contEventosNegocios">
          {eventos.map((evento) => {
            const fechaTermino = new Date(evento.fecha_termino);
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" alt="nanay" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">Finalizó el {fechaTermino.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaTermino.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                    <h2>{evento.nombre}</h2>
                    <p className="infEventoUbicacion">
                      {evento.direccion}
                    </p>
                    <p className="asistentesEvento">
                      Asistieron {evento.asistentes_cont} personas
                    </p>
                    <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                  </div>

                  <div className="coverEvento">
                    {evento.precio === null || evento.precio === 0 ? <p> La entrada fue gratuita </p> : <p className="cover"> Tuvo un cover de: ${evento.precio} </p>}

                  </div>
                </section>
              </div>
            )
          })}
        </section>
      </>
    )

    case 'negociosAnteriores': return (
      <>
        {!anteriores.length ? (<div className="notData"> No hay eventos anteriores </div>) : (null)}
        <section className="contEventosNegocios">
          {anteriores.map((evento) => {
            const fechaTermino = new Date(evento.fecha_termino);
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" alt="nanay" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">Finalizó el {fechaTermino.toLocaleDateString('es-us', { weekday: "long", month: "short", year: "numeric", day: "numeric" })}, {fechaTermino.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>

                    <h2>{evento.nombre}</h2>
                    <p className="infEventoUbicacion">
                      {evento.direccion}
                    </p>
                    <p className="asistentesEvento">
                      Asistieron {evento.asistentes_cont} personas
                    </p>
                    <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                  </div>

                  <div className="coverEvento">
                    {evento.precio === null || evento.precio === 0 ? <p> La entrada fue gratuita </p> : <p className="cover"> Tuvo un cover de: ${evento.precio} </p>}

                  </div>
                </section>
              </div>
            )
          })}
        </section>
      </>
    )
    
    default: return;
  }
}

export default ListaEventosFeed;