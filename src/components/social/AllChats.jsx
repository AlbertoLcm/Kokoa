import React, { useState } from "react";
import Modal from "../Modal";
import Chat from "./Chat";

const AllChats = () => {

  const [showModal, setShowModal] = useState(false);
  const [receptor, setReceptor] = useState({});

  const chats = [{
    "id": 5,
    "nombre": "Restaurante Meli",
    "direccion": "Ixtapaluca, Méx., México",
    "descripcion": "esto es un ejemplo\n",
    "horario": " - ,  - ,  - ,  - ,  - ,  - ,  - ",
    "rol": "negocios",
    "propietario": 2,
    "tipo": null,
    "numero": "",
    "email": "",
    "sitio_web": null,
    "portada": null,
    "perfil": "https://koko-server.fly.dev/api/upload/user.jpg"
  },
  {
    "id": 6,
    "nombre": "Tienda de tomates",
    "direccion": "",
    "descripcion": "preuba no es real",
    "horario": " - ,  - ,  - ,  - ,  - ,  - ,  - ",
    "rol": "negocios",
    "propietario": 6,
    "tipo": null,
    "numero": "",
    "email": "",
    "sitio_web": null,
    "portada": null,
    "perfil": "https://koko-server.fly.dev/api/upload/user.jpg"
  }]

  const actionMostrarChat = (chat) => {
    setShowModal(true);
    setReceptor(chat);
  };
  
  return (
    <>
      <section className="contSeleccion">
        {chats.map((chat, index) => {
          return (
            <>
              <section className="contSelChat" onClick={() => actionMostrarChat(chat)}>
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
        {console.log(receptor.id)}
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