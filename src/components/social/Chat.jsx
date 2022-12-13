import React, { useEffect, useState, useRef } from "react";
import instance from "../../api/axios";
import useAuth from "../../auth/useAuth";
import socket from "../../components/sockets/Socket";

const Chat = ({ receptor }) => {

  const { user } = useAuth();
  
  const chatPos = useRef()
  const [mensajes, setMensajes] = useState([]);
  const [mensajeEmisor, setMensajeEmisor] = useState({
    mensaje: "",
    receptor: { id: receptor.receptor, rol: receptor.receptor_rol },
    emisor: user.id,
    emisor_rol: user.rol,
    origen: "envio"
  });
  
  useEffect(() => {
    instance.get(`/mensajes/${user.id}/${user.rol}/${receptor.receptor}/${receptor.receptor_rol}`)
      .then((response) => {
        setMensajes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [mensajes]);

  const handleChat = (e) => {
    setMensajeEmisor({
      ...mensajeEmisor,
      [e.target.name]: e.target.value,
    });
  };

  const actionEviarMensaje = (e) => {
    e.preventDefault(); //esto previene que el form se mande.

    if(mensajeEmisor.mensaje !== "") {
      socket.emit('send-message', mensajeEmisor);
      setMensajes([...mensajes, {mensaje: mensajeEmisor.mensaje, origen: "envio"}]);
      setMensajeEmisor({
        mensaje: "",
        receptor: { id: receptor.receptor, rol: receptor.receptor_rol },
        emisor: user.id,
        emisor_rol: user.rol,
        origen: "envio"
      });
    }
  };
  
  return (
    <section className="homeChat">
      <section className="titulo">
        <div className="contImagen">
          <img src={receptor.perfil} alt="si" className="imagenTitulo" />
        </div>

        <div className="nombre">
          {receptor.nombre}
        </div>
      </section>

      <section className="mensajes">
      <div className="mensajeEmisor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeReceptor">
          <p>
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
          </p>
        </div>
        <div className="mensajeEmisor">
          <p>
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
            hola mensaje demasiado largo para la implementacion del chat
          </p>
        </div>
        <div className="mensajeReceptor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeEmisor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeReceptor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeEmisor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeReceptor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeEmisor">
          <p>
            hola
          </p>
        </div>
        <div className="mensajeReceptor">
          <p>
            hola
          </p>
        </div>
        {
          mensajes.map((mensaje, index) => {
            return (
              mensaje.origen === "envio" ? (
                <div className="mensajeEmisor" key={index}>
                  <p>
                    {mensaje.mensaje}
                  </p>
                </div>
              ) : (
                <div className="mensajeReceptor" key={index}>
                  <p>
                    {mensaje.mensaje}
                  </p>
                </div>
              )
            )
          })
        }
        <div ref={chatPos}/>
      </section>

      <form onSubmit={actionEviarMensaje} method="POST" action="/" className="homeEscrituraChat">
        <div className="contMensaje">
          <input autoComplete="off" type={'text'} name="mensaje" id="mensaje" value={mensajeEmisor.mensaje} onChange={handleChat} />
        </div>

        <button type="submit" className="send">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
          </svg>
        </button>
      </form>
    </section>
  );
};

export default Chat;