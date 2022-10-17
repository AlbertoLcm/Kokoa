import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import DatosAnfitrion from "../components/infElements/DatosAfitrion";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";
import Header from "../components/Header"


function VisPerfs() {
  const { id } = useParams()

  const nav = useNavigate();

  const { logout, user } = useAuth();

  const [opcio, setOpcio] = useState(false);
  const toggle = () => {setOpcio(!opcio)};
  
  const [visua, setVisua] = useState(2);

  return (
    <>
      <Header tipo={"color"} volver={true} user={user[0].nombre}/>
      <div id="ContPrincVisPerf">
        <div id="ContPerfilFeedAnfitrion">
          <DatosAnfitrion id={id} />
        </div>          
        <div id="ContPerfilFeedEventoGeneral">
          <div className="contBotEvesVisPerf">
            <button className="BotEvesVisPerf" onClick={() => setVisua(1)}>Eventos Futuros</button>
            <div className="vrLine" />
            <button className="BotEvesVisPerf" onClick={() => setVisua(2)}>Eventos Actuales</button>
            <div className="vrLine" />
            <button className="BotEvesVisPerf" onClick={() => setVisua(3)}>Historial</button>
          </div>
          {
            visua === 1 ? (
              <>
                <h1>Proximamente</h1>
                <div id="ContPerfilFeedEventoActual">
                  <ListaEventosFeed id={id} solicito="futuros"/>
                </div>
              </>
            ) : visua === 2 ? (
              <> 
                <h1>Actualmente</h1>
                <div id="ContPerfilFeedEventoActual">
                  <ListaEventosFeed id={id} solicito="actuales"/>
                </div>
              </>
            ) : (
              <>
              <h1>Todos nuestros eventos</h1>
              <div id="ContPerfilFeedEventoActual">
                <ListaEventosFeed id={id} solicito="todos"/>
              </div>
              </>
            )
          }

          

          

          

        </div>
      </div>
    </>
  )

}

export default VisPerfs
