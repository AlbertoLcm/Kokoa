import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Comentario from "./Comentario";
import '../../stylesheets/VisPerfs.css';
import socket from "../sockets/Socket";

const ListarComentarios = ({ id_negocio }) => {

  const [comentarios, setComentarios] = useState([]);
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    instance.get(`negocios/comentarios/eventos/${id_negocio}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
      .catch((err) => console.log(err))

    instance.get(`/eventos/all/${id_negocio}`)
      .then((eventos) => {
        setEventos(eventos.data)
      })
      .catch((err) => console.log(err))

      socket.on('new-comentario', (comentario) => {
        instance.get(`negocios/comentarios/eventos/${id_negocio}`)
        .then((comentarios) => {
          setComentarios(comentarios.data)
        })
        .catch((err) => console.log(err))
      });
  }, []);

  if(!eventos.length && !comentarios.length) { 
    return( 
      <div id="ContGeneralComentariosNegocio">
        <div className="noComentarios">Aún no tienes publicaciones</div>
      </div>
    )
  }
  
  return (
    <div id="ContGeneralComentariosNegocio">
      {eventos.map((evento) => {
        return (
          <div id="ContComentariosNegocio">
            <div className="contEventoFeed">
              <p>{evento.nombre}</p>
            </div>
            {comentarios.map((comentario) => {
              if (comentario.id_evento === evento.id_evento) {
                return (
                  <section id="InfOpinionesAnfitrion">
                    <Comentario data={comentario} />
                  </section>
                )
              }
            })}
          </div>
        )
      })}
    </div>
  );
};

export default ListarComentarios;