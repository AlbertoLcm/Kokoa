import React, { useEffect, useState } from 'react';
import instance from '../../api/axios';
import foto from "../../images/Wall (59).jpg";

const Comentario = ({data}) => {

  let fechaComentario = new Date(data.fecha);
  
  return (
    <div className="opinionesAnfitrion">
      <div className="opinionAnfitrion">

        <section className="contOpinador">
          <div className="fotoOpinador">
            <img src={foto} />
          </div>
          <div className="nombreOpinador">
            <p>{data.nombre} {data.apellidos}</p>
            <p className="fecha">{fechaComentario.toLocaleDateString()}</p>
          </div>
        </section>

        <section className="contOpinion">
          <p>{data.comentario}</p>
        </section>
        
      </div>
    </div>
  );
};

export default Comentario;