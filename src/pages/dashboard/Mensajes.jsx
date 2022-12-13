import React from "react";
import Chats from "./chats/Chats";
import Chat from "./chats/Chat";
import { Route, Routes } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { useEffect } from "react";

const Null = () => {
  return (
    <div className="notSelect"> Selecciona un chat </div>
  );
}

const Mensajes = () => {

  const { showChat, actionShowChat }  = useAuth();
  useEffect(() => {
    if (showChat) {
      actionShowChat(false)
    }
  }, []);
  
  return (
    <div className="contDashboardMensajes">
      {showChat ? (
        <section className={"d-nonen"}>
          <Chats />
        </section>
      ) : (
        <section className={"chats"}>
          <Chats />
        </section>
      )}
      <section className="chat">
        <Routes>
          <Route path=':id/:rol' element={<Chat />} />
          <Route path="/" element={<Null />} />
        </Routes>
      </section>
    </div>
  );
}

export default Mensajes;