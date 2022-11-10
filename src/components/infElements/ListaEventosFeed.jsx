import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";
import image from "../../images/concert.jpg"
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../auth/useAuth";

function ListaEventosFeed({ id, solicito }) {

  const [eventos, setEventos] = useState({});
  const [loading, setLoading] = useState(true);
  const [asistencia, setAsistencia] = useState([]);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    instance.get(`/eventos/all/${id}`)
      .then((eventos) => {
        setEventos(eventos.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    instance.post('/eventos/asistente/check', { id_usuario: user.id })
      .then((asistencias) => {
        setAsistencia(asistencias.data)
      })
  }, []);

  if (loading) {
    return (
      <section id="ContPerfilFeedEventoActual">
        <Skeleton type={'eventoFeed'} />
      </section>
    )
  };

  if (!eventos.length) {
    return (
      <section id="ContPerfilFeedEventoActual">
        <h1>No tienes eventos</h1>
      </section>
    )
  };
  const fecact = new Date();

  const actionAsistir = (id_evento) => {
    instance.post('/eventos/asistente', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance.get(`/eventos/all/${id}`)
          .then((eventos) => {
            setEventos(eventos.data)
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
        instance.get(`/eventos/all/${id}`)
          .then((eventos) => {
            setEventos(eventos.data)
          })

        instance.post('/eventos/asistente/check', { id_usuario: user.id })
          .then((asistencias) => {
            setAsistencia(asistencias.data)
          })
      })
  };

  switch (solicito) {
    case 'proximos': return (
      <>
        {eventos.map((evento, index) => {
          let fecini = new Date(evento.fecha_inicio)
          let fecter = new Date(evento.fecha_termino)
          if (fecini > fecact) {
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">
                      Incia el
                      {` ${fecini.toLocaleDateString()} `}
                      a las
                      {` ${fecter.toLocaleTimeString()} `}
                      horas
                    </p>
                    <h2>{evento.nombre}</h2>
                    <p className="infEventoUbicacion">
                      {evento.direccion}
                    </p>
                    <p className="asistentesEvento">
                      Asistiran {evento.asistentes_cont} personas
                    </p>
                    <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                  </div>

                  <div className="coverEvento">
                    {evento.precio === null || evento.precio == 0 ? <p> Entrada gratuita </p> : <p className="cover"> Cover: {evento.precio} </p>}

                    {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="btnAsistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button> : <button className="btnAsistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>}

                  </div>
                </section>
              </div>
            )
          }
        })
        }
      </>
    )

    case 'anteriores': return (
      <>
        {eventos.map((evento, index) => {
          let fecini = new Date(evento.fecha_inicio)
          let fecter = new Date(evento.fecha_termino)
          if (fecact < fecter) {
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">
                      Incia el
                      {` ${fecini.toLocaleDateString()} `}
                      a las
                      {` ${fecter.toLocaleTimeString()} `}
                      horas
                    </p>
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
                    {evento.precio === null || evento.precio == 0 ? <p> La entrada fue gratuita </p> : <p className="cover"> Tuvo un cover de: ${evento.precio} </p>}

                    {/* {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="btnAsistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button> : <button className="btnAsistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>} */}

                  </div>
                </section>
              </div>
            )
          }
        })
        }
      </>
    )

    case 'todos': return (
      <>
        {eventos.map((evento) => {
          let fecini = new Date(evento.fecha_inicio)
          let fecter = new Date(evento.fecha_termino)
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">
                      Incia el
                      {` ${fecini.toLocaleDateString()} `}
                      a las
                      {` ${fecter.toLocaleTimeString()} `}
                      horas
                    </p>
                    <h2>{evento.nombre}</h2>
                    <p className="infEventoUbicacion">
                      {evento.direccion}
                    </p>
                    <p className="asistentesEvento">
                      Asistiran {evento.asistentes_cont} personas
                    </p>
                    <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                  </div>

                  <div className="coverEvento">
                    {evento.precio === null || evento.precio == 0 ? <p> Entrada gratuita </p> : <p className="cover"> Cover: {evento.precio} </p>}

                    {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="btnAsistirTrue" onClick={() => actionAusentar(evento.id_evento)}>Ya asistiras</button> : <button className="btnAsistir" onClick={() => actionAsistir(evento.id_evento)}>Asistir</button>}

                  </div>
                </section>
              </div>
            )
        })
        }
      </>
    )

    case 'negocio': return (
      <>
        {eventos.map((evento) => {
          let fecini = new Date(evento.fecha_inicio)
          let fecter = new Date(evento.fecha_termino)
            return (
              <div id="PerfilFeedEvento">
                <section id="ContImgEventoFeed">
                  <img src={image} id="ImgEventoFeed" />
                </section>

                <section id="ContInfEvento">
                  <div className="infEvento">
                    <p className="infEventoFecha">
                      Incia el
                      {` ${fecini.toLocaleDateString()} `}
                      a las
                      {` ${fecter.toLocaleTimeString()} `}
                      horas
                    </p>
                    <h2>{evento.nombre}</h2>
                    <p className="infEventoUbicacion">
                      {evento.direccion}
                    </p>
                    <p className="asistentesEvento">
                      Asistiran {evento.asistentes_cont} personas
                    </p>
                    <Link to={`/evento/${evento.id_evento}`} state={{ from: location }} className="link">Ver más</Link>
                  </div>

                  <div className="coverEvento">
                    {evento.precio === null || evento.precio == 0 ? <p> Entrada gratuita </p> : <p className="cover"> Cover: {evento.precio} </p>}

                    <button className="btnAsistirTrue">Editar este evento</button>

                  </div>
                </section>
              </div>
            )
        })
        }
      </>
    )
  }
}

export default ListaEventosFeed;