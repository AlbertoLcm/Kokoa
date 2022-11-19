import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import DatosAnfitrion from "../components/infElements/DatosAfitrion";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";
import Header from "../components/Header"
import { useEffect } from "react";

function VisPerfs() {
  const { id } = useParams()
  const nav = useNavigate();
  const { logout, user } = useAuth();
  const [opcio, setOpcio] = useState(false);
  const [visua, setVisua] = useState(1);
  const toggle = () => {setOpcio(!opcio)};
  const location = useLocation();

  console.log(location)

  useEffect(() => {
    if (location.state?.pagina) {
      setVisua(location.state.pagina);
    }
  }, []);

  return (
    <>
      <Header tipo={"responsive"} perfil={user.nombre} back={true}/>
      <div id="ContPrincVisPerf">
        <section id="ContPerfilFeedAnfitrion">
          <div id="PerfilFeedAnfitrion">
            <DatosAnfitrion id={id} section={"perfil"} />
          </div>
        </section>

        <section id="ContBtnFeedAnfitrion">
          <div id="BtnFeedAnfitrion">
            <button className="BotEvesVisPerf" onClick={() => setVisua(1)}>Inicio</button>
            <div className="vrLine" />
            <button className="BotEvesVisPerf" onClick={() => setVisua(2)}>Eventos</button>
            <div className="vrLine" />
            <button className="BotEvesVisPerf" onClick={() => setVisua(3)}>Anteriormente</button>
          </div>
        </section>

        <section id="ContPerfilFeedEventoGeneral">
          <div id="ContenedorResponsiveFeed">
            {
              visua === 1 ? (
                <>
                  <div id="ContPerfilFeedInformacion">
                    <DatosAnfitrion id={id} section={"informacion"} />
                  </div>
                </>
              ) : visua === 2 ? (
                <> 
                  <h1>Actualmente</h1>
                  <div id="ContPerfilFeedEventos">
                    <ListaEventosFeed id={id} solicito="todos"/>
                  </div>
                </>
              ) : (
                <>
                <h1>Eventos pasados</h1>
                <div id="ContPerfilFeedEventos">
                  {/* <ListaEventosFeed id={id} solicito="todos"/> */}
                </div>
                </>
              )
            }
          </div>
        </section>
      </div>
    </>
  )

}

export default VisPerfs
