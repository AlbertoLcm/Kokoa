import React, { useState } from "react";
import useAuth from "../../auth/useAuth";
import ListaEventosFeed from "../../components/infElements/ListaEventosFeed";

const Eventos = () => {

  const { user } = useAuth();
  const [eventos, setEventos] = useState('negocios');

  const handleChange = (e) => {
    setEventos(e.target.value);
  }

  return (
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
            <button className="btnCrear">Crear evento</button>
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
  );
}

export default Eventos;