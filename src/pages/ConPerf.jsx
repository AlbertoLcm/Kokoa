import React from "react";
import { useState } from "react";
import Perfil from "../components/Perfil"
import Header from "../components/Header";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/ConfPerf.css"

function ConPerf() {
    const [cont, setCont] = useState(0);
    function cambioVis(ver) {
        setCont(ver);
        document.getElementById("bd").style.backgorund = "linear-gradient(to right, #410046 80%, #d47f00cd)";
        console.log(document.getElementById("bd").style.backgorund)
    }

    return(  
        <div className="contPerf">
            <Header tipo={"color"}>
                <h1>Fiestero</h1>
            </Header>
            <div className="contBase">
                <div className="navSideBar">
                <button id="bd" onClick={() => cambioVis(1)}>Configurar Direccion</button>
                </div>
                <div className="contVis">
                    {
                        cont === 1 ?(
                            <div className="direccion"> 
                                <Perfil />
                            </div>
                        ) : (
                            <div className="entrVis">
                                <h1>Bienvenido a la configuracion de tu perfil</h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ConPerf;