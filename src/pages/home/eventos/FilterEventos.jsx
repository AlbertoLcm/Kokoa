import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../../auth/useAuth";
import { useEffect } from "react";
import instance from "../../../api/axios";
import Tarjeta from "../eventos/Tarjeta"

const FilterEventos = () => {

  const { eventos } = useAuth();
  
  const [eventosAll, setEventosAll] = useState([]);
  const [eventosFilter, setEventosFilter] = useState([]);
  const [searchParams] = useSearchParams();

  const lugar = searchParams.get("lugar");
  const fecha = searchParams.get("fechaLimite");
  const curso = searchParams.get("curso");
  const get = searchParams.get("get");
  const getLocation = searchParams.get("getLocation");
  let fechaFilter = new Date(fecha).toISOString();

  const filters = () => {
    if(curso) return setEventosFilter(eventosAll.filter((evento) => {
      let fechaEvento = new Date(evento.fecha_inicio).toISOString();
      return new Date() > fechaEvento;
    }));

    let filters = eventosAll.filter((evento) => {
      let fechaEvento = new Date(evento.fecha_inicio).toISOString();
      return fechaEvento < fechaFilter;
    });
    setEventosFilter(filters);
  };

  useEffect(() => {
    instance.get("/eventos")
      .then((res) => {
        setEventosAll(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    filters();
  }, [searchParams]);

  if (lugar || fecha || curso) {
    return(
      <section className="tarjetas">
        {!eventosFilter.length ? <div className="notData">No hay eventos {get} en {getLocation}</div> : null}
        {eventosFilter.map((evento, index) => <Tarjeta key={index} evento={evento} />)}
      </section>
    );
  }

  return (
    <section className="tarjetas">
      {eventos.map((evento, index) => <Tarjeta key={index} evento={evento} />)}
    </section>
  );
}

export default FilterEventos;