import React, { useState, useEffect } from "react";
import instance from "../../api/axios";
import useAuth from "../../auth/useAuth";
import Chat from "./Chat";

const AllChats = () => {
  const [receptor, setReceptor] = useState({});
  const [chats, setChats] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    instance.get(`/mensajes/chats/${user.id}/${user.rol}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const actionMostrarChat = (chat) => {
    setReceptor(chat);
  };
  
  return (
    <>
      <section className="contSeleccion">
        {!chats.length ? (<h1> No hay chats </h1>) : (null)}
        {chats.map((chat, index) => {
          return (
            <>
              <section key={index} className="contSelChat" onClick={() => actionMostrarChat(chat)}>
                <div className="contImgSelChat">
                  <img src={chat.perfil} alt="si" />
                </div>
                <div className="contInfoSelChat">
                  <h2>{chat.nombre}</h2>
                </div>
              </section>
            </>
          )
        })}
      </section>
      <section>

        {
          receptor.id !== undefined ? (
            <Chat receptor={receptor} />
          ) : (
            <div id="altChat">
              <h1>Seleccina un chat y comienza tus negociaciones</h1>
            </div>
          )
        }
      </section>
    </>
  );
};

export default AllChats;