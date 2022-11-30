import React, { useState } from "react";
import { useEffect } from "react";
import instance from "../../api/axios";
import useAuth from "../../auth/useAuth";
import Evento from "../EventosPagPrin";
import socket from "../sockets/Socket";

const Transcurso = ({ map, metodo }) => {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    instance.get('/eventos/transcurso').then((results) => {
      setEventos(results.data);
    });

    socket.on('new-evento', (evento) => {
      instance.get('/eventos/transcurso').then((results) => {
        setEventos(results.data);
      });
    });
  }, []);

  return (
    <>
      {!eventos.length ? (<div className="comentariosNull"> No hay eventos en curso </div>) : (null)}
      {eventos.map((evento) => {
        return (
          <Evento
            id={evento.id_evento}
            lugar={evento.direccion}
            titulo={evento.nombre}
            fecha={evento.fecha_inicio}
            corrs={{ lat: evento.lat, lng: evento.lng }}
            mapa={map}
          />
        );
      })}
    </>
  );
};

export default Transcurso;