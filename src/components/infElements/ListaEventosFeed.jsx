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

  if(loading) {
    return <Skeleton />
  }
  
  return (
    <div className="contEvPerf">
      <div className="evActVisPerf">Eventos Actuales
        {eventos.map((evento) => {
          return (
            <div>
              <h1>{evento.nombre}</h1>
              <h2>{evento.descripcion}</h2>
              <h3>Ubicado en: {evento.ubicacion}  </h3>
              <h3>Inicio: {evento.fecha_inicio} Termino: {evento.fecha_termino} </h3>
              <h3>Capacidad {evento.capacidad} Cover: {evento.precio} </h3>
            </div>
          )
        })}
      </div>

      <div>Historial de eventos
        <p>Inserte evetos</p>
      </div>
    </div>
  )
}

export default ListaEventosFeed;