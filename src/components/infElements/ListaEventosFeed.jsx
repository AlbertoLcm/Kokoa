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
        return (
          <div id="PerfilFeedEvento">
            <h2>{evento.nombre}</h2>
            <label>Ubicado:</label>
            {evento.ubicacion}
            <label>Incia:</label>
            {evento.fecha_inicio}
            <label>Termina</label>
            {evento.fecha_termino}
            <label>Capacidad</label>
            {evento.capacidad}
            <label>Cover</label>
            {evento.precio}
            <label>{evento.descripcion}</label>
          </div>
        )
      })}
    </>
  )
}

export default ListaEventosFeed;