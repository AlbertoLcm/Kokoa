import React from "react";
import "../stylesheets/Marcadores.css";

function Marcador({ children,latitud, longitud, texto, tipo}){
    return(
        <div className={tipo} lat={latitud} lng={longitud} text={texto}>
            <span>{children}</span>
        </div>
    );
}

export default Marcador;