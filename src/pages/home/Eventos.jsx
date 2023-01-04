import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams  } from "react-router-dom";
import '../../stylesheets/pages/componetsHome.css'
import FilterEventos from "./eventos/FilterEventos";

const Eventos = () => {

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [filter, setFilter] = useState({
    ubicacion: "",
    curso: false,
    fechaLimite: "",
    get: "",
    getLocation: "tu ubicación"
  });

  useEffect(() => {
    if(!filter.ubicacion && !filter.curso && !filter.fechaLimite) return navigate(`/eventos`);
    setParams(filter);
  }, [filter]);
  
  const handleFilter = (e) => {
    if(e.target.name === "fecha" && e.target.value === "cualquiera") return setFilter({
      fechaLimite: "",
      getLocation: filter.getLocation,
    });
    if(e.target.name === "fecha" && e.target.value === "curso") return setFilter({
      curso: true,
      getLocation: filter.getLocation,
      get: "en curso"
    });
    if(e.target.name === "fecha" && e.target.value === "hoy") return setFilter({
      getLocation: filter.getLocation,
      fechaLimite: new Date(),
      get: "hoy"
    });
    if(e.target.name === "fecha" && e.target.value === "semana") return setFilter({
      fechaLimite: new Date(new Date().setDate(new Date().getDate() + 7)),
      getLocation: filter.getLocation,
      get: "esta semana"
    });
    if(e.target.name === "fecha" && e.target.value === "mes") return setFilter({
      fechaLimite: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      getLocation: filter.getLocation,
      get: "en este mes"
    });
  };
  
  return (
    <section className="contPageEventos">

      <div className="header" onChange={handleFilter}>
        <select name="ubicacion">
          <option value="" selected>Tú ubicación</option>
        </select>

        <select name="fecha" onChange={handleFilter}>
          <option value="cualquiera" selected>Cualquier Fecha</option>
          <option value='curso'>En curso</option>
          <option value='hoy'>Hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>
      </div>

      <FilterEventos />

    </section>
  );
}

export default Eventos;