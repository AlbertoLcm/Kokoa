import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormEvento from "./FormEvento";

const Crear = () => {

  const navigation = useNavigate();
  const location = useLocation();
  
  return (
    <div className="contCrearEvento">
      {/* Los estilos del boton estan en Profile.css */}
      <button onClick={() => navigation(location.state?.from)} className="btnExit">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <section className="formulario">
        <section className="titulo">
          <h1>Crear Evento.</h1>
        </section>
        <FormEvento />
      </section>
      
    </div>
  );
};

export default Crear;