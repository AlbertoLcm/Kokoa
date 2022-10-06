import React from "react";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import Perfil from "../components/Perfil"
import Header from "../components/Header";
import { slide as Menu } from "react-burger-menu";
import "../stylesheets/ConfPerf.css"

function ConPerf() {
    const { logout, user } = useAuth();

    const [cont, setCont] = useState(0);
    function cambioVis(ver) {
        setCont(ver);
        document.getElementById("bd").style.backgorund = "linear-gradient(to right, #410046 80%, #d47f00cd)";
        console.log(document.getElementById("bd").style.backgorund)
    }

    const [opcio, setOpcio] = useState(false);
    const toggle = () => {setOpcio(!opcio)};

    return (
        <div className="contPerf">
            <header className="color">
                <section className="contLogo">
                    <div className="logo">Kokoa</div>
                </section>
                <button onClick={() => toggle(!opcio)} className="butNav">
                    {" "}
                    {user.nombre}{" "}
                </button>
            </header>
            {
                opcio && (
                    <div className="acomodo">
                        <div className="dropiOpcio">
                            <a onClick={() => logout()}>Cerrar Sesion</a>
                        </div>
                    </div>
                )
            }
            <div className="contBase">
                <div className="navSideBar">
                    <button id="bd" onClick={() => cambioVis(1)}>Información personal</button>
                </div>
                <div className="contVis">
                    {
                        cont === 1 ? (
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