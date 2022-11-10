import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import foto from "../../images/Wall (59).jpg";
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

            <p>Estos son los comentarios del evento</p>

            {comentarios.map((comentario) => {
              let fechaComentario = new Date(comentario.fecha);

              if (comentario.id_evento === evento.id_evento) {
                return (
                  <section id="InfOpinionesAnfitrion">

                    <div className="opinionesAnfitrion">
                      <div className="opinionAnfitrion">

                        <section className="contOpinador">
                          <div className="fotoOpinador">
                            <img src={foto} />
                          </div>
                          <div className="nombreOpinador">
                            <p>{comentario.nombre} {comentario.apellidos}</p>
                            <p className="fecha">{fechaComentario.toLocaleDateString()}</p>
                          </div>
                        </section>

                        <section className="contOpinion">
                          <p>{comentario.comentario}</p>
                        </section>

                      </div>
                    </div>
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