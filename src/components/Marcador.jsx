import React from "react";
import React from "react";
import "../stylesheets/Marcadores.css";

function Marcador({ children,latitud, longitud, texto}){
    return(
        <div className="inputBox" lat={latitud} lng={longitud} text={texto}>
            <span>{children}</span>
        </div>
    );
}

export default Marcador;