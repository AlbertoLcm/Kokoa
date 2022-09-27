import React from "react";
import "../stylesheets/Marcadores.css";

function Marcador({texto, tipo}){
    return(
            <div className="Contenedor">
                <div className={tipo}></div>
                <h3 className="texto">{texto}</h3>
            </div>
    );
}

export default Marcador;