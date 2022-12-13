import React from "react";
import ListaEventosFeed from "../../components/infElements/ListaEventosFeed";

const Eventos = () => {
  return (
    <div className="contDashboardEvento">

      <section className="encabezado">
        <div className="titulo">
          Eventos actuales
        </div>

        <section className="botones">
          <div>
            <button className="btnCrear">Crear evento</button>
          </div>
          <div className="content-select">
            <select name="publico">
              <option value="1" selected>Actuales</option>
              <option value="0">Anteriores</option>
            </select>
            <i></i>
          </div>
        </section>

      </section>

      <section className="contenido">
        <ListaEventosFeed id={1} solicito="negocios" />
      </section>

    </div>
  );
}

export default Eventos;