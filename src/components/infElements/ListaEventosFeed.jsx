import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";
import image from "../../images/Plagui.jpg"

function ListaEventosFeed({ id, solicito }) {

  const [eventos, setEventos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/eventos/all/${id}`)
      .then((eventos) => {
        setEventos(eventos.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Skeleton type={'eventoFeed'} />
    ) 
  }
  const fecact = new Date()

  return (
    <>
      {
        solicito === "actuales" ? (
          eventos.map((evento) => {
            let fecini = new Date(evento.fecha_inicio)
            let fecter = new Date(evento.fecha_termino)
            // Eventos Actuales
            if((fecact > fecini) && (fecact < fecter)){
              return (
                <div id="PerfilFeedEvento">
                  {/* Imagen del evento */}
                  <div id="ContImgEvento"><img src={image} alt="Imagen no encontrada" /></div>
                  {/* Informacion del evento */}
                  <h2>{evento.nombre}</h2>
                  <p>
                  <label>Ubicado: </label>
                  {evento.ubicacion}
                  </p>
                  <p>
                    <label>Incia el dia: </label>
                    {fecini.toLocaleDateString() }
                    <br />
                    <label> A las: </label>
                    {fecter.toLocaleTimeString()}
                    <label> horas</label>
                  </p>
                  <p>
                    <label>Termina el dia: </label>
                    {fecini.toLocaleDateString()}
                    <br />
                    <label> A las: </label>
                    {fecini.toLocaleTimeString()}
                    <label> horas </label>
                  </p>
                  <p>
                    <label>Capacidad</label>
                    {evento.capacidad}
                  </p>
                  <p>
                    <label>Cover</label>
                    {evento.precio}
                  </p>
                  <p>{evento.descripcion}</p>
                </div>
              )
            }
          })
        ) : solicito === "futuros" ? (
          eventos.map((evento) => {
            let fecini = new Date(evento.fecha_inicio)
            let fecter = new Date(evento.fecha_termino)
            // Eventos futuros
            if(fecact < fecini){
              return (
                <div id="PerfilFeedEvento">
                  {/* Imagen del evento */}
                  <div id="ContImgEvento"><img src={image} alt="Imagen no encontrada" /></div>
                  {/* Informacion del evento */}
                  <h2>{evento.nombre}</h2>
                  <p>
                  <label>Ubicado: </label>
                  {evento.ubicacion}
                  </p>
                  <p>
                    <label>Incia el dia: </label>
                    {fecini.toLocaleDateString()}
                    <br />
                    <label> A las: </label>
                    {fecter.toLocaleTimeString()}
                    <label> horas</label>
                  </p>
                  <p>
                    <label>Termina el dia: </label>
                    {fecini.toLocaleDateString()}
                    <br />
                    <label> A las: </label>
                    {fecini.toLocaleTimeString()}
                    <label> horas </label>
                  </p>
                  <p>
                    <label>Capacidad</label>
                    {evento.capacidad}
                  </p>
                  <p>
                    <label>Cover</label>
                    {evento.precio}
                  </p>
                  <p>{evento.descripcion}</p>
                </div>
              )
            }
          })
        ) : solicito === "todos" ? (
          eventos.map((evento) => {
            let fecini = new Date(evento.fecha_inicio)
            let fecter = new Date(evento.fecha_termino)
            // Todos los eventos
              return (
                <div id="PerfilFeedEvento">
                  {/* Imagen del evento */}
                  <div id="ContImgEvento"><img src={image} alt="Imagen no encontrada" /></div>
                  {/* Informacion del evento */}
                  <h2>{evento.nombre}</h2>
                  <p>
                  <label>Ubicado: </label>
                  {evento.ubicacion}
                  </p>
                  <p>
                    <label>Incia el dia: </label>
                    {fecini.toLocaleDateString()}
                    <br />
                    <label> A las: </label>
                    {fecter.toLocaleTimeString()}
                    <label> horas</label>
                  </p>
                  <p>
                    <label>Termina el dia: </label>
                    {fecini.toLocaleDateString()}
                    <br />
                    <label> A las: </label>
                    {fecini.toLocaleTimeString()}
                    <label> horas </label>
                  </p>
                  <p>
                    <label>Capacidad</label>
                    {evento.capacidad}
                  </p>
                  <p>
                    <label>Cover</label>
                    {evento.precio}
                  </p>
                  <p>{evento.descripcion}</p>
                </div>
              )
            }
          )
        ) : (
          <div>Asi no</div>
        )


      }
    </>
  )
}

export default ListaEventosFeed;