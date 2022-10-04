import React from "react";
import "../stylesheets/EventosPagPrin.css"


function Evento ({titulo, corrs, mapa, lugar}) {
   function handleOnDoubleClick(){
    // eslint-disable-next-line no-undef
    mapa.panTo(corrs);
    // eslint-disable-next-line no-undef
    mapa.setZoom(19);
   }
    
    return (
        <div className="contEvento">
            <button onClick={() => handleOnDoubleClick()}>
                {titulo}
            </button>
            <p>{lugar}</p>
        </div>
    )

}

export default Evento