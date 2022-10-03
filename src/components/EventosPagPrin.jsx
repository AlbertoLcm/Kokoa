import React from "react";
import "../stylesheets/EventosPagPrin.css"


function Evento ({titulo, corrs}) {
    function MoverMapa(){
        const map = document.getMap()
        map.panTo(corrs.lat,corrs.lng)
    }
    
    return (
        <button className="contEvento">
            {titulo}
        </button>
    )

}

export default Evento