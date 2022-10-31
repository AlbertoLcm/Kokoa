import React from "react";
import "../stylesheets/EventosPagPrin.css"
import image from "../images/concert.jpg"

function Evento({ titulo, fecha, corrs, mapa, lugar, id, metodo }) {
  function handleOnDoubleClick() {
    metodo(id);
    // eslint-disable-next-line no-undef
    mapa.panTo(corrs);
    // eslint-disable-next-line no-undef
    mapa.setZoom(19);
  }
  let fecini = new Date(fecha)

  return (
    <div id="ContEventoHomeFeed" onClick={() => handleOnDoubleClick()}>
      <section id="ContImgEventoFeed">
        <img src={image} id="ImgEventoFeed" />
      </section>

      <section id="ContInfEvento">
        <div className="infEvento">
          <p className="infEventoFecha">
            Incia el
            {` ${fecini.toLocaleDateString()} `}
            a las
            {` ${fecini.toLocaleTimeString()} `}
            horas
          </p>
          <h2>{titulo}</h2>
          <p className="infEventoUbicacion">
            {lugar}
          </p>
        </div>
      </section>
    </div>
  )

}

export default Evento