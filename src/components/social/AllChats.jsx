import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import useAuth from "../../auth/useAuth";
import Modal from "../Modal";
import Chat from "./Chat";

const AllChats = () => {

  const [showModal, setShowModal] = useState(false);
  const [chats, setChats] = useState([]);
  const [receptor, setReceptor] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    instance.get(`/api/mensajes/${user.id}/${user.rol}`)
    .then((res) => {
      setChats(res.data);
    })
  }, []);

  const actionMostrarChat = (chat) => {
    setShowModal(true);
    setReceptor(chat);
  };
  
  return (
    <>
      <section className="contSeleccion">
        {!chats.length ? (<h1> No hay chats </h1>) : (null)}
        {chats.map((chat, index) => {
          return (
            <>
              <section className="contSelChat" onClick={() => actionMostrarChat(chat)}>
                <div className="contImgSelChat">
                  <img src={chat.perfil} alt="si" />
                </div>
                <div className="contInfoSelChat">
                  <h2>{chat.nombre}</h2>
                  <p>Ultimo mensaje</p>
                </div>
              </section>
            </>
          )
        })}
      </section>
      <section>
        <Chat receptor={receptor} />
      </section>
      <Modal
      estado={showModal}
      cambiarEstado={setShowModal}
      titulo={receptor.nombre}>
        
      </Modal>
    </>
  );
};

export default AllChats;