import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";

function ListaEventosFeed({ id }) {

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
  


  return (
    <>
      {eventos.map((evento) => {
        let fecini = new Date(evento.fecha_inicio)
        let fecter = new Date(evento.fecha_termino)

        return (
          <div id="PerfilFeedEvento">
            <h2>{evento.nombre}</h2>
            <p>
            <label>Ubicado: </label>
            {evento.ubicacion}
            </p>
            <p>
              <label>Incia el dia: </label>
              {fecini.toLocaleDateString()}
              <label> A las: </label>
              {fecter.toLocaleTimeString()}
              <label> horas</label>
            </p>

            <p>
              <label>Termina el dia: </label>
              {fecini.toLocaleDateString()}
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
      })}
    </>
  )
}

export default ListaEventosFeed;