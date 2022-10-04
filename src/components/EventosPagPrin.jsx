import React from "react";
import "../stylesheets/EventosPagPrin.css"


function Evento ({titulo, corrs, mapa, lugar}) {
   function handleOnDoubleClick(){
    mapa.panTo(corrs);
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