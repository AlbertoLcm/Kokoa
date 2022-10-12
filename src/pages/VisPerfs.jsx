import React from "react";
import "../stylesheets/VisPerfs.css"
import useAuth from "../auth/useAuth";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useParams} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import DatosAnfitrion from "../components/infElements/DatosAfitrion";
import ListaEventosFeed from "../components/infElements/ListaEventosFeed";


function VisPerfs() {
  const {id} = useParams()
  const nav = useNavigate();
  const {logout, user} = useAuth();
  const [opcio, setOpcio] = useState(false);
  const toggle = () => {
    setOpcio(!opcio)
  };

  return (
    <div>
      <header className="color">
        <section className="contLogo">
          <div className="logo">Kokoa</div>
        </section>
        <button onClick={
            () => toggle(!opcio)
          }
          className="butNav"></button>
      </header>
      {
      opcio && (
        <div className="acomodo" id="acomodo">
          <div className="dropiOpcio">
            <div onClick={
                () => nav(-1)
              }
              id='toggleSalir'>Volver</div>
            <div onClick={
                () => logout()
              }
              id='toggleSalir'>Salir</div>
          </div>
        </div>
      )
    }
      <div className="contPrincVisPerf">
        <Menu>
          <h1>Nombre</h1>
          <div>Descripcion</div>
          <div>Ubicacion</div>
          <div>Horario</div>
        </Menu>
        <DatosAnfitrion id={id}/>
        <ListaEventosFeed id={id}/>
      </div>
    </div>
  )

}

export default VisPerfs
