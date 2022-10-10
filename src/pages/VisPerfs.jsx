import React from "react";
import useAuth from "../auth/useAuth";

function VisPerfs() {
    const {logout, user} = useAuth();


    return(
        <div>
            <header className="color">
                <section className="contLogo">
                    <div className="logo">Kokoa</div>
                </section>
                <button onClick={() => toggle(!opcio)} className="butNav">
                    {" "}
                    {user[0].nombre}{" "}
                </button>
            </header>
            {
                opcio && (
                    <div className="acomodo">
                        <div className="dropiOpcio">
                            <button onClick={() => nav(-1)}>Volver</button>
                            <button onClick={() => logout()}>Cerrar Sesion</button>
                        </div>
                    </div>
                )
            }
            <div className="contPrincVisPerf">
                <h1>Nombre</h1>
                <div className="infoVisPerf">
                    <h1>Descripción</h1>
                    <div><h1>Inserte descripsion</h1></div>
                    
                    <h1>Ubicación</h1>
                    <div><h1>Inserte ubicacion</h1></div>

                    <h1>Horario</h1>
                    <div><h1>Inserte Horario</h1></div>
                </div>

                <h1>Historial de eventos</h1>
                <div><h1>Inserte historial</h1></div>


            </div>
        </div>
    )

}