import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Inicio from "./Inicio";
import Eventos from "./Eventos";
import Estadisticas from "./Estadisticas";
import Mensajes from "./Mensajes";
import Perfil from "./Perfil";
import Configuracion from "./Configuracion";
import Header from "../../components/Header";
import useAuth from "../../auth/useAuth";

function DasBoard() {

  const { user } = useAuth();
  
  return (
    <>
      <Header tipo={'responsive'} perfil={user.nombre_cargo} back={false} />

      <section className="contDashboard">
        <Sidebar />
        <Routes>
          <Route exact path="inicio" element={<Inicio />} />
          <Route exact path="eventos" element={<Eventos />} />
          <Route exact path="estadisticas/*" element={<Estadisticas />} />
          <Route exact path="mensajes/*" element={<Mensajes />} />
          <Route exact path="perfil" element={<Perfil />} />
          <Route exact path="configuracion/*" element={<Configuracion />} />
        </Routes>
      </section>
    </>
  )
}

export default DasBoard;