import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import '../../stylesheets/pages/componetsHome.css'
import FilterEventos from "./eventos/FilterEventos";

const Eventos = () => {

  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    ubicacion: "",
    fecha: ""
  });

  useEffect(() => {
    if(filter.ubicacion === "" && filter.fecha === "") return navigate(`/eventos`);
    navigate(`/eventos?lugar="${filter.ubicacion}"&fecha=${filter.fecha}`);
  }, [filter]);

  const handleFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <section className="contPageEventos">

      <div className="header" onChange={handleFilter}>
        <select name="ubicacion">
          <option value="" selected>Tú ubicación</option>
          <option value="cualquiera">Cualquier lugar</option>
        </select>

        <select name="fecha" onChange={handleFilter}>
          <option value="" selected>Cualquier Fecha</option>
          <option value={new Date()}>En curso</option>
          <option value={new Date()}>Hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>
      </div>

      <FilterEventos />

    </section>
  );
}

export default Eventos;