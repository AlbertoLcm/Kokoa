import React, { useState, useEffect, useRef } from "react";
import '../../../stylesheets/VisPerfs.css';
import '../../../stylesheets/Home.css';
import { Link, useParams } from "react-router-dom";
import instance from "../../../api/axios";
import LoadingElement from "../../../components/loadings/LoadingElement";
import { animateScroll as scroll, Events } from 'react-scroll';
import socket from "../../../components/sockets/Socket";
import useAuth from "../../../auth/useAuth";

const Chat = () => {

  const { user } = useAuth();
  const { id, rol } = useParams(); // Datos del receptor
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState({
    mensaje: "",
    receptor: { id: id, rol: rol },
    emisor: { id: user.id, rol: user.rol },
    origen: "envio",
  });
  const [chat, setChat] = useState({
    receptor: { id: id, rol: rol },
    emisor: { id: user.id, rol: user.rol },
  });

  socket.on(`new-from-${id}-${rol}-to-${user.id}-${user.rol}`, (msg) => {
    setMensajes([...mensajes, {mensaje: msg, origen: "recibo"}])
    console.log(msg)
  });

  useEffect(() => {
    scrollFinal();
  }, [mensajes]);
  
  useEffect(() => {
    setLoading(true);
    getDatos();
  }, [id, rol]);

  const getDatos = () => {
    setMensajes([]);
    instance.get(`mensajes/${id}/${rol}`)
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })

    instance.get(`mensajes/${user.id}/${user.rol}/${id}/${rol}`)
      .then((res) => {
        setMensajes(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  const scrollFinal = () => {
    scroll.scrollToBottom({
      duration: 0,
      containerId: "mensajes"
    });
  }

  const handleChange = (e) => {
    setMensaje({
      ...mensaje,
      [e.target.name]: e.target.value
    });
  }

  const actionEviarMensaje = (e) => {
    e.preventDefault(); //esto previene que el form se mande.

    if(mensaje.mensaje !== "") {
      setMensajes([...mensajes, {mensaje: mensaje.mensaje, origen: "envio"}])
      instance.post("/mensajes", mensaje)
      .then((res) => {
        socket.emit('send-message', mensaje);
        if(res.data.chatAdd === true) {
          socket.emit('new-chat', chat);
        }
        console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
      setMensaje({
        mensaje: "",
        receptor: { id: id, rol: rol },
        emisor: {id: user.id, rol: user.rol},
        origen: "envio"
      });
    }
  };

  if (loading) {
    return (
      <section className="homeChat">
        <LoadingElement />
      </section>
    )
  }

  return (
    <section className="homeChat">
      <section className="titulo">
        <section className="usuario">
          <div className="contImagen">
            <img src={usuario.perfil} alt="perfil" className="imagenTitulo" />
          </div>

          <div className="nombre" onClick={() => scrollFinal()}>
            {usuario.nombre}
          </div>
        </section>

        <Link to={`/visperfil/${usuario.id}`} >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
            <polyline points="11 12 12 12 12 16 13 16" />
          </svg>
        </Link>
      </section>

      <div className="mensajes" id="mensajes" >
        {mensajes.map((mensaje, index) => {
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
          })}

      </div>

      <form method="POST" onSubmit={actionEviarMensaje} className="homeEscrituraChat">
        <div className="contMensaje">
          <input autoComplete="off" value={mensaje.mensaje} onChange={handleChange} type={'text'} placeholder="Escribe un mensaje" name="mensaje" id="mensaje" />
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
}

export default Chat;