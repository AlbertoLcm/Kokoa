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
  const [searchParams, setSearchParams] = useSearchParams();

  const lugar = searchParams.get("lugar");
  const fecha = searchParams.get("fecha");
  let fechaFilter = new Date(fecha).toISOString();

  const filters = () => {
    let filters = eventosAll.filter((evento, index) => {
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
  }, [lugar, fecha]);

  if (lugar && fecha) {
    return(
      <section className="tarjetas">
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