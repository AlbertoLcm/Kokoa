import React, { useState } from "react";
import Asistiras from "./eventos/Asistiras";
import Recomendados from "./eventos/Recomendados";
import TusEventos from "./eventos/TusEventos";

const Inicio = () => {

  const [eventosActive, setEventosActive] = useState(false);
  const [asistirasActive, setAsistirasActive] = useState(false);
  const [recomendadosActive, setRecomendadosActive] = useState(false);
  
  return (
    <div className="contPageInicio">
      <button className={eventosActive ? "select active" : "select"} onClick={() => setEventosActive(!eventosActive)}>
        <section className="title">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="15" y1="5" x2="15" y2="7" />
            <line x1="15" y1="11" x2="15" y2="13" />
            <line x1="15" y1="17" x2="15" y2="19" />
            <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
          </svg>
          Tus eventos
        </section>

        <section>
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </section>
      </button>

      {eventosActive ? (<TusEventos />) : null}

      <button className={asistirasActive ? "select active" : "select"} onClick={() => setAsistirasActive(!asistirasActive)}>
        <section className="title">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
          Eventos que asistiras
        </section>

        <section>
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </section>
      </button>

      {asistirasActive ? (<Asistiras />) : null}

      <button className={recomendadosActive ? "select active" : "select"} onClick={() => setRecomendadosActive(!recomendadosActive)}>
        <section className="title">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
          Eventos recomendados
        </section>

        <section>
          <svg xmlns="http://www.w3.org/2000/svg" class="arrow" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </section>
      </button>

      {recomendadosActive ? (<Recomendados />) : null}

    </div>
  );
}

export default Inicio;