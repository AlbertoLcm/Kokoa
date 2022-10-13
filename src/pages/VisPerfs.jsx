import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import DatosAnfitrion from "../components/infElements/DatosAfitrion";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";


function VisPerfs() {
  const { id } = useParams()
  const nav = useNavigate();
  const { logout, user } = useAuth();
  const [opcio, setOpcio] = useState(false);
  const toggle = () => {
    setOpcio(!opcio)
  };

  return (
    <>
      <header className="color">
        <section className="contLogo">
          <div className="logo">Kokoa</div>
        </section>
      </header>
      <div id="ContPrincVisPerf">
        <div id="ContPerfilFeedAnfitrion">
          <DatosAnfitrion id={id} />
        </div>

        <div id="ContPerfilFeedEventoGeneral">
          <div id="ContPerfilFeedEventoActual">
            <h1>Eventos actuales</h1>
            <ListaEventosFeed id={id} />
          </div>

          <div id="ContPerfilFeedEventoAterior">
            <h1>Eventos anteriores</h1>
            <p>Inserte evetos</p>
          </div>
        </div>
      </div>
    </>
  )

}

export default VisPerfs
