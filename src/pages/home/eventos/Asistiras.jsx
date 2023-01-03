import React, { useState } from "react";
import { useEffect } from "react";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import Tarjeta from "./Tarjeta";

const Asistiras = () => {

  const { user } = useAuth();

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/eventos/asiste/${user.id}`)
      .then(res => {
        setEventos(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
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
          <p>Aún no asistiras a ningún evento</p>
        </div>
      </section>
    );
  }

  return(
    <section className="contGeneralSelectInicio">
      <div className="contSelectInicio">
        <section className="tarjetas">

          {eventos.map(evento => {
            return <Tarjeta evento={evento} />
          })}

        </section>
      </div>
    </section>
  );
  
};

export default Asistiras;