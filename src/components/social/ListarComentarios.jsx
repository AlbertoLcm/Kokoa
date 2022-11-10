import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Comentario from "./Comentario";
import '../../stylesheets/VisPerfs.css';

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
  }, []);

  console.log(comentarios);

  return (
    <div id="ContGeneralComentariosNegocio">
      {eventos.map((evento) => {
        return (
          <div id="ContComentariosNegocio">
            <div className="contEvento">
              <p>{evento.nombre}</p>
            </div>


            {comentarios.map((comentario) => {
              let fechaComentario = new Date(comentario.fecha);

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