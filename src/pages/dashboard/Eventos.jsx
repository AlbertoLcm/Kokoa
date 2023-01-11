import React, { Fragment, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import ListaEventosFeed from "../../components/infElements/ListaEventosFeed";
import Crear from "../home/eventos/Crear";

const Eventos = () => {

  const { user } = useAuth();
  const [eventos, setEventos] = useState('negocios');
  const navigation = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setEventos(e.target.value);
  }

  return (
    <Fragment>
      <Routes>
        <Route path="crear" element={<Crear />} />
      </Routes>
      <div className="contDashboardEvento">


        <section className="encabezado">

          {eventos === "negocios" ? (
            <div className="titulo">
              Eventos actuales
            </div>
          ) : (
            <div className="tituloAnterior">
              Eventos anteriores
            </div>
          )}

          <section className="botones">
            <div>
              <button className="btnCrear" onClick={() => navigation('crear', { state: { from: location.pathname } })}>Crear evento</button>
            </div>
            <div className="content-select">
              <select name="eventos" onChange={handleChange} >
                <option value="negocios" selected>Actuales</option>
                <option value="negociosAnteriores">Anteriores</option>
              </select>
              <i></i>
            </div>
          </section>

        </section>

        <section className="contenido">
          <ListaEventosFeed id={user.id} solicito={eventos} />
        </section>

      </div>
    </Fragment>
  );
}

export default Eventos;