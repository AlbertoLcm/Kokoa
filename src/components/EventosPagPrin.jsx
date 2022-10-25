import React from "react";
import "../stylesheets/EventosPagPrin.css"
import image from "../images/concert.jpg"

function Evento({ titulo, corrs, mapa, lugar, id, metodo }) {
  function handleOnDoubleClick() {
    metodo(id);
    // eslint-disable-next-line no-undef
    mapa.panTo(corrs);
    // eslint-disable-next-line no-undef
    mapa.setZoom(19);
  }

  return (
    <div id="ContEventoHomeFeed" onClick={() => handleOnDoubleClick()}>
      <section id="ContImgEventoFeed">
        <img src={image} id="ImgEventoFeed" />
      </section>

      <section id="ContInfEvento">
        <div className="infEvento">
          <p className="infEventoFecha">
            Sab, 17 octubre a las 16:00 horas
          </p>
          <h2>{titulo}</h2>
          <p className="infEventoUbicacion">
            {lugar}
          </p>
          <p className="asistentesEvento">
            Asistiran 12 personas
          </p>
        </div>
      </section>
    </div>
  )

}

export default Evento