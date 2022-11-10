import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Comentario from "./Comentario";

const ComentariosNegocio = ({ id_negocio }) => {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    instance.get(`/negocios/comentarios/${id_negocio}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
      .catch((err) => console.log(err))
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