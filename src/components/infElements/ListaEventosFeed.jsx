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

  const actionAsistir = (id_evento, index) => {
    instance.post('/eventos/asistente', { id_evento: id_evento, id_usuario: user.id })
      .then((res) => {
        instance.get(`/eventos/all/${id}`)
          .then((eventos) => {
            setEventos(eventos.data)
          })
      })
  };

  return (
    <>
      {
        // solicito === "actuales" ? (
        eventos.map((evento, index) => {
          let fecini = new Date(evento.fecha_inicio)
          let fecter = new Date(evento.fecha_termino)
          // Eventos Actuales
          if (fecact) {
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

                    {asistencia.find((asistencia) => asistencia.id_evento === evento.id_evento) ? <button className="btnAsistir" onClick={() => actionAsistir(evento.id_evento, index)}>Asistir</button> : <button className="btnAsistirTrue">Ya asistiras</button>}

                  </div>
                </section>
              </div>
            )
          }
        })
        // ) : solicito === "futuros" ? (
        //   eventos.map((evento) => {
        //     let fecini = new Date(evento.fecha_inicio)
        //     let fecter = new Date(evento.fecha_termino)
        //     // Eventos futuros
        //     if(fecact < fecini){
        //       return (
        //         <div id="PerfilFeedEvento">
        //           {/* Imagen del evento */}
        //           <div id="ContImgEvento"><img src={image} alt="Imagen no encontrada" /></div>
        //           {/* Informacion del evento */}
        //           <h2>{evento.nombre}</h2>
        //           <p>
        //           <label>Ubicado: </label>
        //           {evento.ubicacion}
        //           </p>
        //           <p>
        //             <label>Incia el dia: </label>
        //             {fecini.toLocaleDateString()}
        //             <br />
        //             <label> A las: </label>
        //             {fecter.toLocaleTimeString()}
        //             <label> horas</label>
        //           </p>
        //           <p>
        //             <label>Termina el dia: </label>
        //             {fecini.toLocaleDateString()}
        //             <br />
        //             <label> A las: </label>
        //             {fecini.toLocaleTimeString()}
        //             <label> horas </label>
        //           </p>
        //           <p>
        //             <label>Capacidad</label>
        //             {evento.capacidad}
        //           </p>
        //           <p>
        //             <label>Cover</label>
        //             {evento.precio}
        //           </p>
        //           <p>{evento.descripcion}</p>
        //         </div>
        //       )
        //     }
        //   })
        // ) : solicito === "todos" ? (
        //   eventos.map((evento) => {
        //     let fecini = new Date(evento.fecha_inicio)
        //     let fecter = new Date(evento.fecha_termino)
        //     // Todos los eventos
        //       return (
        //         <div id="PerfilFeedEvento">
        //           {/* Imagen del evento */}
        //           <div id="ContImgEvento"><img src={image} alt="Imagen no encontrada" /></div>
        //           {/* Informacion del evento */}
        //           <h2>{evento.nombre}</h2>
        //           <p>
        //           <label>Ubicado: </label>
        //           {evento.ubicacion}
        //           </p>
        //           <p>
        //             <label>Incia el dia: </label>
        //             {fecini.toLocaleDateString()}
        //             <br />
        //             <label> A las: </label>
        //             {fecter.toLocaleTimeString()}
        //             <label> horas</label>
        //           </p>
        //           <p>
        //             <label>Termina el dia: </label>
        //             {fecini.toLocaleDateString()}
        //             <br />
        //             <label> A las: </label>
        //             {fecini.toLocaleTimeString()}
        //             <label> horas </label>
        //           </p>
        //           <p>
        //             <label>Capacidad</label>
        //             {evento.capacidad}
        //           </p>
        //           <p>
        //             <label>Cover</label>
        //             {evento.precio}
        //           </p>
        //           <p>{evento.descripcion}</p>
        //         </div>
        //       )
        //     }
        //   )
        // ) : (
        //   <div>Asi no</div>
        // )


      }
    </>
  )
}

export default ListaEventosFeed;