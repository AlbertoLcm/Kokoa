import React, { useEffect, useState } from "react";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import Tarjeta from "./Tarjeta";

const TusEventos = () => {

  const { user } = useAuth();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/eventos/creados/usuario/${user.id}`)
      .then(resultados => setEventos(resultados.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  if(loading){
    return(
      <section className="contGeneralSelectInicio">
        <div className="contSelectInicio">
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  if (!eventos.length) {
    return (
      <section className="contGeneralSelectInicio">
        <div className="contSelectInicio">
          <p>Tus eventos creados aparecerán aqui.</p>
        </div>
      </section>
    );
  }

  return(
    <section className="contGeneralSelectInicio">
      <div className="contSelectInicio">
        <section className="tarjetas">
          {eventos.map((evento, index) => <Tarjeta evento={evento} key={index} /> )}
        </section>
      </div>
    </section>
  );
  
};

export default TusEventos;