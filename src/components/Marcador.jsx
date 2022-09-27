import React from "react";
import "../stylesheets/Marcadores.css";

function Marcador({texto, tipo}){
    return(
            <div>
                {texto}
                <div className={tipo}></div>
            </div>
        
    );
}

export default Marcador;