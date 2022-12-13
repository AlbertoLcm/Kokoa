import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import Buscador from "../../../components/Buscador";
import LoadingElement from "../../../components/loadings/LoadingElement";
import socket from "../../../components/sockets/Socket"
import imagen from '../../../images/Wall (59).jpg';
import '../../../stylesheets/Home.css';

const Chats = () => {

  const { user, actionShowChat } = useAuth();
  const [active, setActive] = useState(false);
  const [busquedas, setBusquedas] = useState([]);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState({
    data: ''
  });
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    instance.get(`/mensajes/chats/${user.id}/${user.rol}`)
      .then((response) => {
        setChats(response.data);
        actionShowChat(false);
      })
      .catch((error) => {
        console.log(error);
      });
    
    actionShowChat(false);
      
    socket.on(`new-chat-to-${user.id}-${user.rol}`, (msg) => {
      instance.get(`/mensajes/chats/${user.id}/${user.rol}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }); 
    
    socket.on('new-chat', (data) => {
      instance.get(`/mensajes/chats/${user.id}/${user.rol}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    })
  }, []);

  useEffect(() => {
    socket.on('busqueda', (data) => {
      setBusquedas(data);
    })
  }, [busquedas])

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    })
    // emitimos el evento 
    socket.emit('busqueda', e.target.value);
  }

  const actionBuscar = (e) => {
    e.preventDefault(); //esto previene que el form se mande.

    // instance.get(`/busquedas/general/${search.data}`)
    //   .then((response) => {
    //     setNotFound(false);
    //     setBusquedas(response.data);
    //   })
    //   .catch((error) => {
    //     setNotFound(true);
    //   });
  }

  const actionDisabled = () => {
    setActive(false);
    setSearch({
      data: ''
    });
    setBusquedas([]);
  }

  return (
    <>
      <section className="seleccionTitulo">
        <h1>Chats</h1>
        <section className="contBuscador">
          {active ? <button className="btnBack" onClick={() => actionDisabled()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3a4" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          </button> : null}
          <form method="POST" onSubmit={actionBuscar} >
            <input onClick={() => setActive(true)} autoComplete="off" type="text" className="buscador" name="data" placeholder={'Buscar chats, artistas o patrocinadores'} onChange={handleChange} value={search.data} />
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
            </button>
          </form>
        </section>
      </section>

      <div className={active ? "contSeleccion select" : "d-none"} >
        {notFound ? (<div className="notSelect"> No hay resultados para {search.data} </div> ) : (null)}
        {busquedas.map((chat) => {
          return (
            <NavLink onClick={() => actionDisabled()} to={`/dashboard/mensajes/${chat.id}/${chat.rol}`} className={({ isActive }) => isActive ? "active" : ""} >
              <section className="contSelChat">
                <div className="contImgSelChat">
                  <img src={chat.perfil} alt="perfil" />
                </div>
                <div className="contInfoSelChat">
                  <h2>{chat.nombre}</h2>
                  <p>{chat.rol === "patrocinadores" ? 'Patrocinador' : 'Artista'}</p>
                </div>
              </section>
            </NavLink>
          )
        })}
      </div>

      <div className={active ? "d-none" : "contSeleccion"}>

        {!chats.length ? (<div className="notSelect">Aún no tienes chats</div> ) : (null)}
        {chats.map((chat) => {
          return (
            <NavLink onClick={() => actionShowChat(true) } to={`/dashboard/mensajes/${chat.id}/${chat.rol}`} className={({ isActive }) => isActive ? "active" : ""} >
              <section className="contSelChat">
                <div className="contImgSelChat">
                  <img src={chat.perfil} alt="perfil" />
                </div>
                <div className="contInfoSelChat">
                  <h2>{chat.nombre}</h2>
                  <p>{chat.rol === "patrocinadores" ? "Patrocinador" : "Artista"}</p>
                </div>
              </section>
            </NavLink>
          )
        })}

      </div>
    </>
  );
}

export default Chats;