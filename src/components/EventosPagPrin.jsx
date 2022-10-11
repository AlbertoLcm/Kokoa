import React from "react";
import "../stylesheets/EventosPagPrin.css"


function Evento ({titulo, corrs, mapa, lugar}) {
   function handleOnDoubleClick(){
    // eslint-disable-next-line no-undef
    mapa.panTo(corrs);
    // eslint-disable-next-line no-undef
    mapa.setZoom(17);
   }
    
    return (
        <div className="contEvento" onClick={() => handleOnDoubleClick()}>
            <h3>
                {titulo}
            </h3>
            <p>{lugar}</p>
        </div>
    )

}

export default Evento