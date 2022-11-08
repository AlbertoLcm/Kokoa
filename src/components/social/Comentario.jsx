import React, { useEffect, useState } from 'react';
import instance from '../../api/axios';
import foto from "../../images/Wall (59).jpg";

const Comentario = ({id_usuario, comentario, fecha}) => {

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    instance.get(`/usuarios/${id_usuario}`)
      .then((usuario) => {
        setUsuario(usuario.data)
      })
      .catch((err) => console.log(err));
  }, []);

  let fechaComentario = new Date(fecha);
  
  return (
    <div className="opinionesAnfitrion">
      <div className="opinionAnfitrion">

        <section className="contOpinador">
          <div className="fotoOpinador">
            <img src={foto} />
          </div>
          <div className="nombreOpinador">
            <p>{usuario.nombre} {usuario.apellidos}</p>
            <p className="fecha">{fechaComentario.toLocaleDateString()}</p>
          </div>
        </section>

        <section className="contOpinion">
          <p>{comentario}</p>
        </section>
        
      </div>
    </div>
  );
};

export default Comentario;