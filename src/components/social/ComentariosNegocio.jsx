import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import socket from "../sockets/Socket";
import Comentario from "./Comentario";

const ComentariosNegocio = ({ id_negocio }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    instance.get(`/negocios/comentarios/${id_negocio}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
      .catch((err) => console.log(err))

    socket.on('new-comentario', (comentario) => {
      instance.get(`/negocios/comentarios/${id_negocio}`)
        .then((comentarios) => {
          setComentarios(comentarios.data)
        })
        .catch((err) => console.log(err))
    });
  }, []);

  return (
    <>
      {comentarios.map((comentario) => {
        return (
          <Comentario data={comentario} />
        )
      })}
    </>
  );
};

export default ComentariosNegocio;